// tzupdate.js
// npm install mysql2 axios moment-timezone
const mysql = require('mysql2/promise');
const axios = require('axios');
const moment = require('moment-timezone');

const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY';
const dbConfig = {
  host: 'localhost',
  user: 'your_db_user',
  password: 'your_db_password',
  database: 'your_db_name'
};

async function getTimeZone(lat, lng, timestamp) {
  const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${GOOGLE_API_KEY}`;
  const { data } = await axios.get(url);
  if (data.status === 'OK') {
    return {
      timeZoneId: data.timeZoneId,
      rawOffset: data.rawOffset / 3600 // convert to hours
    };
  }
  throw new Error(`Timezone API error: ${data.status}`);
}

async function updateAttendTimestamps() {
  const connection = await mysql.createConnection(dbConfig);

  // Fetch rows needing checkin update
  const [checkinRows] = await connection.execute(`
    SELECT id, attend_dt, checkin_time, checkin_latitude, checkin_longitude
    FROM attends
    WHERE checkin_time IS NOT NULL AND checkin_utcmillis IS NULL
  `);

  for (const row of checkinRows) {
    const timestamp = Math.floor(new Date(row.checkin_time).getTime() / 1000);
    const tz = await getTimeZone(row.checkin_latitude, row.checkin_longitude, timestamp);

    const attendMillis = moment.tz(row.attend_dt, tz.timeZoneId).valueOf();
    const checkinMillis = moment.tz(row.checkin_time, tz.timeZoneId).valueOf();

    await connection.execute(`
      UPDATE attends SET
        attend_utctz = ?, attend_utcmillis = ?, attend_utcoffset = ?,
        checkin_utctz = ?, checkin_utcmillis = ?, checkin_utcoffset = ?
      WHERE id = ?
    `, [
      tz.timeZoneId, attendMillis, tz.rawOffset,
      tz.timeZoneId, checkinMillis, tz.rawOffset,
      row.id
    ]);
  }

  // Fetch rows needing checkout update
  const [checkoutRows] = await connection.execute(`
    SELECT id, checkout_time, checkout_latitude, checkout_longitude
    FROM attends
    WHERE checkout_time IS NOT NULL AND checkout_utcmillis IS NULL
  `);

  for (const row of checkoutRows) {
    const timestamp = Math.floor(new Date(row.checkout_time).getTime() / 1000);
    const tz = await getTimeZone(row.checkout_latitude, row.checkout_longitude, timestamp);
    const checkoutMillis = moment.tz(row.checkout_time, tz.timeZoneId).valueOf();

    await connection.execute(`
      UPDATE attends SET
        checkout_utctz = ?, checkout_utcmillis = ?, checkout_utcoffset = ?
      WHERE id = ?
    `, [
      tz.timeZoneId, checkoutMillis, tz.rawOffset,
      row.id
    ]);
  }

  await connection.end();
  console.log('Attend timestamps updated successfully.');
}

updateAttendTimestamps().catch(console.error);
