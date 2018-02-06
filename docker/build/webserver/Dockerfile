FROM ubuntu:latest

RUN apt-get -y update


#
#  ----> Instala pacotes gerais
#
RUN apt-get install -y \
        curl \
        wget \
        git-core \
        python-software-properties \
        software-properties-common \
        xvfb \
        wkhtmltopdf \
        unzip \
        locales \
        openssl \
        nano

#
#  ----> Configura locales
#
COPY config-locale.sh /opt/env-config/
RUN /opt/env-config/config-locale.sh


#
#  ---> installa o nodejs
#
RUN cd /tmp && curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

RUN npm install babel webpack webpack-dev-server -g
RUN npm install -g less
RUN npm install uglify-js -g
RUN npm install uglifycss -g
RUN npm install bower -g



#
#  ----> Instala PHP
#
RUN LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

RUN apt-get -y update

RUN apt-get install -y \
        php5.6 \
        php5.6-cli \
        php5.6-mysql \
        php5.6-curl \
        php5.6-gd \
        php5.6-imagick \
        php5.6-mcrypt \
        php5.6-xdebug \
        php5.6-cli \
        php5.6-dev \
        php5.6-intl \
        php5.6-imap \
        php5.6-json \
        php5.6-mbstring \
        php5.6-mongo \
        php5.6-xml \
        php5.6-dom \
        php5.6-readline \
        php5.6-pdo \
        apache2



RUN a2enmod rewrite && a2enmod ssl

#
# ---> realiza configurações para o PHP
COPY config-php.sh /opt/env-config/
RUN /opt/env-config/config-php.sh


    #
    #  ---> instala o composer
    #
    #WORKDIR /tmp
    RUN curl -sS https://getcomposer.org/installer | php
    RUN mv composer.phar /usr/local/bin/composer


#
# ---> configura certificados SSL
#
COPY criar-certificados.sh /opt/env-config/
RUN /opt/env-config/criar-certificados.sh

#
# ---> configura chaves jwt
#
COPY criar-chaves-jwt.sh /opt/env-config/


#
# ---> utilitários para instalar as depencias de pacotes php
#
COPY composer-install.sh /opt/env-config/





#
#  ---> configura apache (virtualhosts, portas, etc)
#
COPY ./config/apache/ports.conf /etc/apache2/
COPY config/apache/sites/api.conf /etc/apache2/sites-available/
COPY ./config/apache/sites/frontend.conf /etc/apache2/sites-available/

RUN a2dissite 000-default
RUN a2ensite api
RUN a2ensite frontend

#
#  Utilizamos o supervisord para manter o apache rodando dentro do container
#
COPY apache-start.sh /opt/env-config/

#
# ---> script a ser executado quando o container for iniciado
#
COPY autostart.sh /opt/env-config/

RUN apt-get install -y supervisor
RUN mkdir -p /var/log/supervisord
COPY supervisord.conf /opt/env-config/

