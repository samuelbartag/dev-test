# Executando a plataforma Evolutto em containers docker

Visando simplificar os processos de criação de ambientes de desenvolvimento, testes e produção para a plataforma, estamos
adotando a arquitetura de containeres, utilizando a tecnologia [**docker**](https://www.docker.com/).






## Pré-requisitos

- docker
- docker compose  


## Geral

- a pasta **build** contém scripts e outros arquivos relacionados a criação e manutenção de imagens docker para a plataforma Evolutto


## Arquitetura da plataforma Evolutto


### Serviços que compõe a plataforma


#### webserver

Container onde fica instalado o servidor web Apache e a linguagem PHP. A pasta onde fica o **código fonte da aplicação** é montada a
partir da maquina hospedeira. Essa configuração é espécialmente útil para o ambiente de desenvolvimento, onde o código fonte
precisa ser acessado pela IDE diretamente na máquina hospedeira.

Outras pastas devem ser montadas e acessadas pelo container (veja a definição de webserver no arquivo **run/docker-composer.yml**)

__/opt/plataforma__ - local o onde está a raiz do código fonte da plataforma
__/opt/composer/cache__ - cache do PHP composer
__/opt/cache/consultoria__ - cache da aplicação **consultoria** (feita em symfony 2)
__/opt/logs/consultoria__ - logs da aplicação **consultoria** (feita em symfony 2)
__/opt/plataforma/prm/symfony_isoonline/cache__ - cache da aplicação **PRM antigo** (feita em symfony 1.4)
__/opt/plataforma/prm/symfony_isoonline/logs__ - logs da aplicação **PRM antigo** (feita em symfony 1.4)
TODO: colocar pasta de arquivos da plataforma, pasta de emails?, etc
TODO: front para aplicações de frontend, já empacotadas

#### dbmaster

Base de dados Mysql. A pasta de dados do Mysql é montada em **/var/lib/mysql**, dentro do container.
Há uma outra pasta **/opt/shared** utilizada para compartilhar arquivos entre o host e o container. 
Essa pasta é util compartilhar arquivo ao longo de tarefas como restauração/criação de dumps, backups, etc.

Em resumo: 
__/var/lib/mysql__ - dados do MySQL, montados dentro do container
__/opt/shared__ - pasta usada para troca de arquivos entre o host e o container docker

#### dbmongo

Base de dados MongoDB. 



## Configurando o ambiente de desenvolvimento

- escolha uma pasta onde você armazenará os **dados da aplicação** que irá rodar na máquina. Esses dados incluem banco de
dados, cache, logs, arquivos da plataforma (anexos). Por exemplo, escolha **/home/felipe/dados/evolutto_dev**. Crie essa 
pasta.
- execute o script de configuração

```
cd docker
./prepare-env.py --datadir=/home/felipe/dados/evolutto_dev
``` 

este script irá criar as pastas necessárias para a aplicação e em seguida, o  arquivo ```envvars```. Este arquivo contém
as variáveis de ambiente necessárias para a aplicação.

- confira se esse arquivo foi gerado corretamente e se as pastas foram criadas.

- configurar parametros **parameters.yml** e **databases.yml**. 
   - para o __parameters.yml__ utilizar o gist https://gist.github.com/omar331/fae1b553e35088aeb422ac2cccc42c56 como 
     referência. (TODO: vamos melhorar em breve)
   - para o __databases.yml__ utilizar o gist https://gist.github.com/omar331/6b25890737fc42c3f5157b0cdb1cb67a como 
     referência.

- restaure a base de dados MySQL

- restaure a base de dados MongoDB 

- executar o composer, para que atualize as dependências de pacotes PHP da plataforma de consultoria e do PRM

       Dica: para executar o __composer install__ no PRM e na consultoria, utilize:
            ```\
                docker exec -it evolutto_webserver /opt/env-config/composer-install.sh
            ```

- assetic:dump 

- para iniciar a aplicação:

```
cd docker
./start.sh
```

e em seguida, para o caso do ambiente de desenvolvimento, acesse a aplicação pelo endereço **https://localhost:8090/app_dev.php**


- para parar a aplicação:

```
cd docker
./stop.sh
```





# TODO:
- diferenças entre ambientes DEV e PROD
- como restaurar a base de dados mysql?
- como restaurar a base de dados mongodb?
- monitoramento de containers
- DNS
- foreman/terraform





Felipe:
- garantir que o docker esteja rodando automaticamente como servico, desde o boot.
- descobrir por que está sendo necessário utilizar sudo para rodar o docker. 




### Comandos úteis

Executa o bash shell dentro do container **evolutto_webserver** 
```
docker exec -it evolutto_webserver bash
```




