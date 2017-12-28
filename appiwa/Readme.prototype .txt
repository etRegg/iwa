Readme:


to install prototype, you need install Docker and docker-compose.


After installing docker and docker-compose, unzip prototype.zip in the folder. write in the terminal:

$docker-compose build 


if you do not find problems, type, 

docker-compose up -d


after if you want stop or start the container just with type in the terminal:
 
$docker-compose start

and 

$docker-compose stop


if you want to see the IP of the container , you type:


$docker   inspect   NAME-CONTAINER  | grep  IP


if you want to delete a stopped container, you type:


docker-compose rm
