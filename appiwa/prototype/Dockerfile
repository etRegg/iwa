FROM node:6
RUN mkdir /usr/src/app
ENV foo /usr/src/app
WORKDIR ${foo} 
RUN apt-get update -qq
RUN apt-get install -y -qq git curl wget
# install bower
RUN npm install --global bower

COPY  prototype   /usr/src/app

   
RUN npm install
RUN echo '{ "allow_root": true }' > /root/.bowerrc
RUN  bower --allow-root install 

# Entrypoint.
ADD ./e.sh /root/entrypoint.sh
RUN chmod +x /root/entrypoint.sh
ENTRYPOINT ["/bin/bash", "/root/entrypoint.sh"]
