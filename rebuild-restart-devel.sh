# rebuild-restart-devel.sh
git checkout devel
docker stop dmtc-apache2-devel
docker rm dmtc-apache2-devel
docker build --no-cache -t dmtc-apache2-devel .
docker run -dit --name dmtc-apache2-devel -p 8082:80 dmtc-apache2-devel
