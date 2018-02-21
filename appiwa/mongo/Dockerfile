
FROM        ubuntu:trusty

MAINTAINER Rodrigo Ezequiel Gimenez Giaimo <gimenezgiaimo.rodrigo@gmail.com>
RUN  sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN  echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list


RUN  apt-get update

RUN  sudo apt-get install -y mongodb-org
RUN  apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 
RUN  echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' > /etc/apt/sources.list.d/mongodb.list 
RUN  apt-get update 
RUN  apt-get install -y mongodb-org 
RUN  rm -rf /var/lib/apt/lists/*
VOLUME ["/data/db"]
WORKDIR /data
CMD ["mongod"]
EXPOSE 27017
EXPOSE 28017

