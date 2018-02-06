#!/usr/bin/env bash

#
#  --> rodar composer install
#


# ---> realiza verificações gerais no ambiente de execução da plataforma
/opt/env-config/verifica-plataforma.sh

export PATH=$PATH:/opt/env-config

#
# ---> script para criar as chaves JWT
#
/opt/env-config/criar-chaves-jwt.sh


#
# ---> mantém o servidor apache rodando
#
/usr/bin/supervisord -c /opt/env-config/supervisord.conf
