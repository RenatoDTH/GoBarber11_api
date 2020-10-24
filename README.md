# GoBarber11_api
Api da nova versão do GoBarber com typescript apresentado pelos ensinamentos da [Rocketseat](https://rocketseat.com.br/). 

## Sobre o GoBarber

GoBarber é um serviço de cadastramento de prestadores, o qual você pode se cadastrar como um e visualizar os agendamentos para o seu serviço. Por outro lado, o consumidor poderá selecionar e agendar com os prestadores de serviço, podendo se usufruir de uma aplicação completa restful, utlizando tanto a versão web, como a mobile.


## Dependências

Para o funcionamento da aplicação é necessário rodar um:

```
yarn install
``` 

Para baixar as dependências do projeto.

Para o desenvolvimento da api, foi utilizado o Mongo, Postgres e o Redis como bancos de dados através do Docker. No env.example, é apresentado as variáveis ambientes no qual você poderá alterar com as configurações feitas por você.

Para a criação dos bancos no Docker, os comandos para criação de cada banco foi:

```
docker run --name <nome> -e POSTGRES_PASSWORD=<senha> -p 5432:5432 -d postgres
docker run --name <nome> -p 27017:27017 -d -t mongo
docker run --name <nome> -p 6379:6379 -d -t redis:alpine
```
Onde os nomes entre <> são substituíveis.

Para visualizar se os containers estão funcionando de fato, é só usar:
```
docker ps
ou 
docker ps -a
```

Para rodar os containers, é só rodar:

```
docker start <nome>
```
e para parar:
```
docker stop <nome>
```

No caso do teste do email, foi usado o [ethereal](https://ethereal.email/) e para poder visualizar ele, é só seguir o link enviado no console.log.
No caso de produção, já está configurado o AWS tanto para imagens como para email, necessitando somente das credenciais.

## Migrations

Neste projeto foi utlizado o [TypeORM](https://typeorm.io/#/using-ormconfig) e é necessário fazer um arquivo de configuração ormconfig.json para conexão com os bancos Postgres e MongoDB. Caso queira alterar o banco para algo de sua preferência, será importante alterar este arquivo.

Sobre as migrations em si, é necessário rodar:

```
yarn typeorm migration:run
```
Para que as migrations criem as tabelas no banco de dados.

## Rodando a aplicação 

Para rodar a aplicação é necessário usar:
```
yarn dev:server
```
Além de rodar os containers do docker. 

Para o melhor funcionamento e visualização é recomendado baixar o [Frontend](https://github.com/RenatoDTH/GoBarber11_web) e [Mobile](https://github.com/RenatoDTH/GoBarber11_mobile) para tirar melhor proveito.
Além disso um arquivo do [Insomnia](https://insomnia.rest/) estará presente, caso só queira interagir com o backend.
