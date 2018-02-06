#!/bin/bash


cd /opt/plataforma/consultoria
composer install
php app/console assetic:dump


cd /opt/plataforma/prm/symfony_isoonline/
composer install

