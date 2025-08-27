@echo off
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YYYY=%dt:~0,4%"
set "MM=%dt:~4,2%"
set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%"
set "Min=%dt:~10,2%"
set "Sec=%dt:~12,2%"
set "timestamp=%YYYY%-%MM%-%DD%_%HH%-%Min%-%Sec%"

set "dbhost=hd-desk.com"
set "dbuser=hdde4090_checkpointprod"
set "dbpass=Init123.*#"
set "dbname=hdde4090_dbcheckpointprod"

REM set "filename=Z:\APPNIAGAHOSTER\DNBCHECKPOINT\DB\%dbname%_%YYYY%%MM%%DD%_%HH%%Min%%Sec%"
set "filename=C:\Users\arin\Downloads\hdde4090_dbcheckpointprodtoapi"
echo File Name: %filename%

mysqldump --column-statistics=0 -u %dbuser% -h %dbhost% -p"%dbpass%" %dbname% > %filename%.sql
REM 7z.exe a %filename%.zip %filename%.sql
REM del %filename%.sql
