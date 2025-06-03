# example 1 - hardcode
DBUSERNAME=YOUR_DATABASE_USERNAME
DBPASSWORD=YOUR_DATABASE_PASSWORD
DBNAME=YOUR_DATABASE_NAME

# example 2 - user argument
# DBUSERNAME=$1
# DBPASSWORD=$2
# DBNAME=$3

unzip ./dbcheckpoint.zip &&
mysql -h localhost -u $DBUSERNAME -p"$DBPASSWORD" $DBNAME < ./dbcheckpoint.zip  &&
php artisan optimize:clear  &&
php artisan cache:clear  &&
php artisan config:clear  &&
php artisan view:clear  &&
php artisan route:clear  &&
php artisan migrate
