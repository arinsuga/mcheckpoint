import react from 'react';

//Interfaces
import ITimeLine from '@/interfaces/ITimeLine';

const AttendHistory = async (data: ITimeLine[]) => {
    
    let templateResult = '';
    templateResult = `
        <html>
        <body>
            <h1>My PDF Document</h1>
            <p>This is a sample PDF generated from AttendHistory....</p>

            <table>
                <thead>
                    <tr style="border: none;">
                        <td colspan="4">
                            <strong>Nama: James</strong>
                        </td>
                    </tr>

                    <tr>
                        <th style="width: 15%;">Tanggal</th>
                        <th style="width: 40%;">Checkin</th>
                        <th style="width: 40%;">Checkout</th>
                        <th style="width: 5%;"><div>Lama</div><div>Kerja</div></th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>01 Oktober 2024</td>
                        <td>
                            Waktu Tanggal 01/10/2024 Jam 09:24:36  
                            Deskripsi    Lokasi Jl. P. Antasari No.12,
                            RT.2/RW.1, Cipete Sel., Kec. Cilandak, Kota
                            Jakarta Selatan, Daerah Khusus Ibukota
                            Jakarta 12410, Indonesia                         
                        </td>
                        <td>
                            Waktu Tanggal 01/10/2024 Jam 17:01:29  
                            Deskripsi    Lokasi Jl. P. Antasari No.12,
                            RT.2/RW.1, Cipete Sel., Kec. Cilandak, Kota
                            Jakarta Selatan, Daerah Khusus Ibukota
                            Jakarta 12410, Indonesia
                        </td>
                        <td>7:36:53</td>
                    </tr>

                    <tr>
                        <td>01 Oktober 2024</td>
                        <td>
                            Waktu Tanggal 01/10/2024 Jam 09:24:36  
                            Deskripsi    Lokasi Jl. P. Antasari No.12,
                            RT.2/RW.1, Cipete Sel., Kec. Cilandak, Kota
                            Jakarta Selatan, Daerah Khusus Ibukota
                            Jakarta 12410, Indonesia                         
                        </td>
                        <td>
                            Waktu Tanggal 01/10/2024 Jam 17:01:29  
                            Deskripsi    Lokasi Jl. P. Antasari No.12,
                            RT.2/RW.1, Cipete Sel., Kec. Cilandak, Kota
                            Jakarta Selatan, Daerah Khusus Ibukota
                            Jakarta 12410, Indonesia
                        </td>
                        <td>7:36:53</td>
                    </tr>
                    <tr>
                        <td>01 Oktober 2024</td>
                        <td>
                            Waktu Tanggal 01/10/2024 Jam 09:24:36  
                            Deskripsi    Lokasi Jl. P. Antasari No.12,
                            RT.2/RW.1, Cipete Sel., Kec. Cilandak, Kota
                            Jakarta Selatan, Daerah Khusus Ibukota
                            Jakarta 12410, Indonesia                         
                        </td>
                        <td>
                            Waktu Tanggal 01/10/2024 Jam 17:01:29  
                            Deskripsi    Lokasi Jl. P. Antasari No.12,
                            RT.2/RW.1, Cipete Sel., Kec. Cilandak, Kota
                            Jakarta Selatan, Daerah Khusus Ibukota
                            Jakarta 12410, Indonesia
                        </td>
                        <td>7:36:53</td>
                    </tr>
                    <tr>
                        <td>01 Oktober 2024</td>
                        <td>
                            Waktu Tanggal 01/10/2024 Jam 09:24:36  
                            Deskripsi    Lokasi Jl. P. Antasari No.12,
                            RT.2/RW.1, Cipete Sel., Kec. Cilandak, Kota
                            Jakarta Selatan, Daerah Khusus Ibukota
                            Jakarta 12410, Indonesia                         
                        </td>
                        <td>
                            Waktu Tanggal 01/10/2024 Jam 17:01:29  
                            Deskripsi    Lokasi Jl. P. Antasari No.12,
                            RT.2/RW.1, Cipete Sel., Kec. Cilandak, Kota
                            Jakarta Selatan, Daerah Khusus Ibukota
                            Jakarta 12410, Indonesia
                        </td>
                        <td>7:36:53</td>
                    </tr>
                    <tr>
                        <td>01 Oktober 2024</td>
                        <td>
                            Waktu Tanggal 01/10/2024 Jam 09:24:36  
                            Deskripsi    Lokasi Jl. P. Antasari No.12,
                            RT.2/RW.1, Cipete Sel., Kec. Cilandak, Kota
                            Jakarta Selatan, Daerah Khusus Ibukota
                            Jakarta 12410, Indonesia                         
                        </td>
                        <td>
                            Waktu Tanggal 01/10/2024 Jam 17:01:29  
                            Deskripsi    Lokasi Jl. P. Antasari No.12,
                            RT.2/RW.1, Cipete Sel., Kec. Cilandak, Kota
                            Jakarta Selatan, Daerah Khusus Ibukota
                            Jakarta 12410, Indonesia
                        </td>
                        <td>7:36:53</td>
                    </tr>
                    
                </tbody>
            </table>


        </body>
        </html>
    `;
    

    return templateResult;
}

export default AttendHistory;    