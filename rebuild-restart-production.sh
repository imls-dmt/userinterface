# rebuild-restart-production.sh
git checkout master
docker stop dmtc-apache2-production
docker rm dmtc-apache2-production
docker build --no-cache -t dmtc-apache2 .
docker run -dit --name dmtc-apache2-production -p 80:80 dmtc-apache2