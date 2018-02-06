

Bem vindo(a) este é um pequeno teste para avaliar suas habilidades como desenvolvedor.



### Descrição do projeto

Trata-se de um sistema simples para cadastrar eventos. É dividido em 2 partes 

- uma API restful que deve ser construida utilizando o framework PHP Symfony
- um frontend que irá se comunicar com a API mencionada acima. O frontend deve ser estruturado para ser uma SPA (single 
page application). Uma vez acessada, durante suas operações não deve fazer recarregamentos de página.
O frontend deve ser desenvolvido utilizando o framework javascript React. 


#### Requisitos básicos

O sistema manterá um simples cadastro de eventos. Cada evento armazenará conterá os seguintes campos:

- Dia e hora do evento.
- Local do evento, apenas texto.
- Participantes do evento. Permitir a inclusão de múltiplos participantes,
sendo que cada um deve ser expresso por um campo de texto puro.

A API, criada em framework para PHP [Symfony versão 3.4](https://symfony.com/download),
deve ser documentada aqui,  [neste documento](./docs/API.md)





### Ambiente de desenvolvimento

O esqueleto da aplicação está estruturado em [containers Docker](https://www.docker.com/docker-community).

Para que você possa utilizá-lo, é necessário que os seguintes softwares estejam
instalados em seu PC 

- docker
- docker-compose

As instruções de instalação variam conforme o sistema operacional utilizado.
[Veja um tutorial de como instalar no Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-16-04-pt).


Para iniciar a execução da aplicação/ambiente de desenvolvimento, em geral, utilize os 
comandos

```
cd docker
docker-compose up api
```

Neste momento os containers **api** e **frontend** estarão disponíveis para 
serem acessados. Veja as descrições a seguir.


#### API

Nesta pasta você deve instalar o Symfony 3.4 e desenvolver a aplicação a partir
daí.

Durante o desenvolvimento o endereço

```
https://localhost:8090/
```

Estará disponivel dar acesso a api. Este também será o endereço para acessá-la
em modo de produção.

Este endereço acessa o servidor Apache que funciona dentro do container
**api**.


#### Frontend (ambiente de desenvolvimento) 

Para iniciar o ambiente de desenvolvimento para o **frontend**, utilize


```
docker-compose up frontdev
```

A estrutura do ambiente de desenvolvimento para o frontend foi baseada no
seguinte __boilerplate__

```
https://github.com/KleoPetroff/react-webpack-boilerplate
```



#### Frontend (ambiente de produção)

O endereço para acessar a aplicação (frontend) em modo de produção será o seguinte

```
http://localhost:8091/
```

Em outras palavras, deve haver um mecanismo para realizar o deploy do frontend
para este servidor.

Este endereço acessa o servidor Apache que funciona dentro do container
**api**.



