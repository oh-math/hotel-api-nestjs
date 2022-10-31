# Proposta do Projeto
Desenvolver uma API para reserva de quartos de hotel.

## A Lógica de Negócio
O hotel devido a pandemia possui apenas um quarto disponível. Para que todos tenham a chance de reservar um quarto, a estadia não pode ser mais longa do que 3 dias e não pode ser reservada com mais de 30 dias de antecedência. Todas as reservas começam pelo menos ao dia seguinte a reserva. 
A API por hora não possui segurança.

## Tecnologias usadas
- Typescript 4.8.4
- NestJS como framework para desenvolvimento da API
- Prisma como ORM
- NPM como gerenciador de dependências

## A arquitetura usada 

A arquitetura usada é a padrão de uso do NestJS, com a separação de entidades pelos seus módulos.

<a href="https://imgbb.com/"><img src="https://i.ibb.co/Fqp8qky/Captura-de-tela-de-2022-10-31-15-09-37.png" alt="Captura-de-tela-de-2022-10-31-15-09-37" border="0"></a>

### Rodando o projeto localmente

`1. Instalando dependências`

    npm install

`2. Criando container docker`


`3. Iniciando migração`

    npm run migrate [comentário]

`4. Iniciando aplicação`
    
    npm run start


`4.1 Iniciando aplicação com refresh automático`

    npm run start:dev


