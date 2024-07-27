FROM ubuntu:latest
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install apache2 -y
USER www-data
CMD ["whoami"]
