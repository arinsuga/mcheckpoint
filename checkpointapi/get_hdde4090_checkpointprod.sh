#!/bin/bash

# Generate timestamp in format YYYY-MM-DD_HH-MM-SS
timestamp=$(date +"%Y-%m-%d_%H-%M-%S")

# Database credentials
dbhost="hd-desk.com"
dbuser="hdde4090_checkpointprod"
dbpass="Init123.*#"
dbname="hdde4090_dbcheckpointprod"

# Output filename with timestamp
#filename="${dbname}_${timestamp}"
filename="${dbname}"

echo "File Name: $filename"

# Dump the entire database to SQL file
mysqldump --column-statistics=0 \
  -u "$dbuser" -h "$dbhost" -p"$dbpass" "$dbname" > "${filename}.sql"

# Compress the SQL file using zip
zip "${filename}.zip" "${filename}.sql"

# Remove the raw SQL file
rm "${filename}.sql"