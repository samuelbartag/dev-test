FROM mysql:5.7

RUN apt-get -y update

RUN apt-get install -y \
        curl \
        wget \
        nano \
        php5 \
        php5-cli \
        php5-mysql


WORKDIR /tmp
RUN wget https://repo.percona.com/apt/percona-release_0.1-5.jessie_all.deb
RUN dpkg -i percona-release_0.1-5.jessie_all.deb

RUN apt-get update
RUN apt-get install -y percona-xtrabackup-24

#
#  ---> instala o composer
#
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

