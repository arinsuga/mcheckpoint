#!/bin/bash
set -a
source .env
set +a
DBUSERNAME="$DB_USERNAME"
DBPASSWORD="$DB_PASSWORD"
DBNAME="$DB_DATABASE"
echo "username: $DBUSERNAME"
echo "password: $DBPASSWORD"
echo "database: $DBNAME"
DEPLOYDIR="./docs/deployments/deploy_20250708"
DBSCRIPT1="$DEPLOYDIR/dbscript/patch1_data_users.sql"
DBSCRIPT2="$DEPLOYDIR/dbscript/patch2_data_roles.sql"
DBSCRIPT3="$DEPLOYDIR/dbscript/patch3_data_attends.sql"
php artisan optimize:clear
php artisan cache:clear
php artisan config:clear
php artisan view:clear
php artisan route:clear
composer dumpautoload --no-scripts
php artisan migrate
mysql -h localhost -u $DBUSERNAME -p"$DBPASSWORD" "$DBNAME" < "$DBSCRIPT1"
mysql -h localhost -u $DBUSERNAME -p"$DBPASSWORD" "$DBNAME" < "$DBSCRIPT2"
mysql -h localhost -u $DBUSERNAME -p"$DBPASSWORD" "$DBNAME" < "$DBSCRIPT3"
php artisan optimize
php artisan config:cache
php artisan view:cache
php artisan route:cache
