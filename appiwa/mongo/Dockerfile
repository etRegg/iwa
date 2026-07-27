FROM        ubuntu:22.04
MAINTAINER Rodrigo Ezequiel Gimenez Giaimo <gimenezgiaimo.rodrigo@gmail.com>
RUN  apt-get update 
RUN apt-get -y mongodb
VOLUME ["/data/db"]
WORKDIR /data
RUN apt-get update && \
    apt-get install -y mongodb && \
    rm -rf /var/lib/apt/lists/*

VOLUME ["/data/db"]

EXPOSE 27017

CMD ["mongod", "--dbpath", "/data/db", "--bind_ip_all"]
EXPOSE 27017
EXPOSE 28017

