# rebuild-restart-testing.sh
git checkout testing
docker stop dmtc-apache2-testing
docker rm dmtc-apache2-testing
docker build --no-cache -t dmtc-apache2 .
docker run -dit --name dmtc-apache2-testing -p 8080:80 dmtc-apache2