#!/bin/bash
echo "========================"
echo "Prepare Environment..."
echo "========================"
set -a
source .env
set +a
DBUSERNAME="$DB_USERNAME"
DBPASSWORD="$DB_PASSWORD"
DBNAME="$DB_DATABASE"
DEPLOYDIR="./docs/deployments/deploy_v110"
DBSCRIPT1="$DEPLOYDIR/dbscript/patch1_data_users.sql"
DBSCRIPT2="$DEPLOYDIR/dbscript/patch2_data_roles.sql"
DBSCRIPT3="$DEPLOYDIR/dbscript/patch3_data_attends.sql"
echo "========================"
echo "Clear Caches..."
echo "========================"
php artisan optimize:clear
php artisan cache:clear
php artisan config:clear
php artisan view:clear
php artisan route:clear
echo "========================"
echo "Composer Dump Autoload..."
echo "========================"
composer dumpautoload --no-scripts
echo "========================"
echo "Database Migration..."
echo "========================"
php artisan migrate
echo "========================"
echo "Database table patch [ $DBSCRIPT1 ]..."
mysql -h localhost -u $DBUSERNAME -p"$DBPASSWORD" "$DBNAME" < "$DBSCRIPT1"
echo "Database table patch [ $DBSCRIPT2 ]..."
mysql -h localhost -u $DBUSERNAME -p"$DBPASSWORD" "$DBNAME" < "$DBSCRIPT2"
echo "Database table patch [ $DBSCRIPT3 ]..."
mysql -h localhost -u $DBUSERNAME -p"$DBPASSWORD" "$DBNAME" < "$DBSCRIPT3"
echo "..."
echo "..."
echo "Deployment Complete..."
