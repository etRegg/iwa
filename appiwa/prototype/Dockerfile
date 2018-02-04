FROM node:9
RUN mkdir /usr/src/app
ENV foo /usr/src/app
WORKDIR ${foo} 
RUN apt-get update -qq
RUN apt-get install -y -qq git curl wget
# install bower
RUN npm install --global bower

COPY  prototype   /usr/src/app

   

RUN echo '{ "allow_root": true }' > /root/.bowerrc
ADD ./e.sh /root/entrypoint.sh
RUN chmod +x /root/entrypoint.sh
ENTRYPOINT ["/bin/bash", "/root/entrypoint.sh"]

EXPOSE 3000
