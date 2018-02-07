## Teste para desenvolvedor Evolutto

Bem vindo(a)! Este é um pequeno teste para avaliar suas habilidades como desenvolvedor. Embora se trate de uma aplicação
simples, a mesma cobre diversas frentes de desenvolvimento usadas em nosso dia a dia, como frontend, backend, API,
infraestrutura e automatização de processos.

Além das competências técnicas e raciocínio lógico, neste teste procuramos avaliar suas habilidades para encontrar 
conhecimentos e soluções para a integração das várias partes compõe uma aplicação.

Desejamos a você, bom teste e sucesso!


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
deve ser documentada aqui,  [neste documento](./docs/API.md). 
Documente os endpoints que você considerar necessários para atingir os objetivos aplicação, informando como os 
mesmos devem ser invocados, que parâmetros devem receber e quais as respostas possíveis e esperadas, incluindo eventuais 
códigos de erro.

O FRONTEND deve ser criado utilizando o framework React. Há um esqueleto de aplicação
disponivel para desenvolvimento do mesmo.   


#### Estrutura da aplicação

A aplicação, vista do frontend, deve ser um SPA (Single Page Application) com as seguintes funcionalidades.

- listagem mostrando os próximos eventos, com a possibilidade de filtrar por intervalo de datas.
- tela para cadastramento de um novo evento. Possibilidade de adicionar participantes. Deve haver um botão 
  "**(+) participante**". Na lista de participantes deve haver um botão "**(-) participante**" para cada item da lista.
- no cadastro de um novo evento, os dados devem ser validados no frontend, durante a digitação dos dados no formulário.
  Não devem ser aceitos eventos em datas passadas. A descrição do evento não pode ficar também não pode ficar vazia.   
- em cada item da lista de eventos deve haver as opções de "**editar evento**" e "**excluir evento**".

Todas as operações mencionadas acima devem ser executadas na API e os resultados da mesma devem ser refletir 
consistentemente no frontend. 



#### Pontos extras

As funcionalidades a seguir não são obrigatórias, mas contam como pontos extras em sua avaliação

- **conectar com o Facebook** - colocar um botão na aplicação que ao ser clicado, coleta os dados básicos da conta no 
  Facebook e os guarda na aplicação, exibindo-os no topo da tela
- **testes unitários para API**
- **testes funcionais para API**   
- **testes unitários para o frontend**


### Ambiente de desenvolvimento

Para você iniciar e desenvolver, oferecemos um esqueleto para desenvolvimento da API e do frontend.
Este esqueleto está estruturado em [containeres Docker](https://www.docker.com/docker-community), que podem facilmente
ser replicados em seu PC.

Para que você possa utilizá-lo, é necessário que os seguintes softwares estejam
instalados em seu PC 

- docker
- docker-compose

As instruções de instalação variam conforme o sistema operacional utilizado.
[Veja um tutorial de como instalar no Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-16-04-pt).


Para iniciar o desenvolvimento crie um fork deste respositório Github e faça
um clone do mesmo em sua máquina.


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

O ambiente será então acessível através do browser pela URL

```
http://localhost:7000/
```

A estrutura do ambiente de desenvolvimento para o frontend foi baseada no
seguinte __boilerplate__

```
https://github.com/KleoPetroff/react-webpack-boilerplate
```

Agora você pode modificá-la a vontade.

Embora você esteja livre para utilizar as bibliotecas de javascript e React que considerar convenientes, sugerimos algumas
com base em nosssa experiência

- [**react-bootstrap**](https://react-bootstrap.github.io/) - incorpora de maneira transparente os componentes do Twitter 
  Bootstrap.
- [**superagent**](https://visionmedia.github.io/superagent/) - client http para realizar chamadas ajax para a API
- [**superagent-mocker**](https://www.npmjs.com/package/superagent-mocker) - mockup para o endpoints da API. Para agilizar
  o desenvolvimento do frontend.





#### Frontend (ambiente de produção)

O endereço para acessar a aplicação (frontend) em modo de produção será o seguinte

```
http://localhost:8091/
```

Em outras palavras, deve haver um mecanismo para realizar o deploy do frontend
para este servidor.

Este endereço acessa o servidor Apache que funciona dentro do container
**api**.



### Deployment do frontend

Quando frontend estiver maduro, a aplicação deve ser copiada para a pasta **frontend**, a partir de onde a mesma será 
acessível a partir do mesmo container onde está a API e o webserver.

Crie um script realizar esse deploy de maneira automatizada.



### Submetendo o projeto para nossa avaliação

Preencha a seção **Como executar a aplicação**, que está logo a seguir com as instruções de como instalar a aplicação
e executar em uma máquina qualquer, especificando quais são os requisitos necessários para executar.

Crie um projeto no Github e nos passe a URL :)  


### Como executar a aplicação

(esta seção deve ser escrita por você. Como faço para executar sua aplicação.)


