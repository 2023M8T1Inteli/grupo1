# Arquitetura do Sistema
Este documento oferece uma visão abrangente do sistema, delineando os componentes fundamentais e as interações entre eles. O objetivo é fornecer uma visão de como preparar o ambiente de desenvolvimento, como executar o sistema e como testar o projeto.

## Descrição da Arquitetura
Na arquitetura do sistema desenvolvido, existem três dispositivos principais conectados, os quais estão relacionados ao uso de dois usuários diferentes. No sistema, temos um **computador**, utilizado pelo **Terapeuta Ocupacional** (TO) para configurar as funções do tapete e o sistema de recompensas, proporcionando uma maior personalização da experiência do paciente, um **Greg Maker** que é responsável por captar os sinais elétricos provenientes do tapete interativo e enviar para o computador interpretá-los, transformando-os em comandos específicos, e um **tapete interativo**, utilizado diretamente pelo paciente, com o objetivo de estimular a realização de tarefas específicas.

Dentro deste escopo, o ambiente de desenvolvimento integrado (IDE) auxiliará o TO a configurar o tapete interativo, por meio de uma interface gráfica, que permitirá a criação de programas no-code, ou seja, sem a necessidade de escrever código, para definir as funções do tapete. Além disso, o compilador de código desenvolvido para facilitar a configuração do tapete, transformará os diagramas construídos pelos terapeutas na plataforma de programação no-code em códigos propriamente ditos, em linguagem QAL, desenvolvida pelo grupo e que tem sua base em Python.

## Preparação do Ambiente
O sistema foi desenvolvido em plataforma web e pensado para ser executado internamente, através da **Intranet** da AACD. Para preparar o ambiente, é necessário que o usuário tenha os pré-requisitos a seguir:

### Pré-requisitos
#### Node.js
O Node.js é um ambiente de execução Javascript que permite a execução de códigos Javascript fora de um navegador. Para instalar o Node.js, basta acessar o site oficial do Node.js e baixar o instalador para o seu sistema operacional. O site oficial do Node.js pode ser acessado através do link: https://nodejs.org/en/download/

Após o download do instalador, basta executá-lo e seguir as instruções do instalador. Para verificar se a instalação foi bem sucedida, basta abrir o terminal e executar o comando `node -v`. Caso a instalação tenha sido bem sucedida, a versão do Node.js instalada será exibida no terminal.

#### npm
O npm é o gerenciador de pacotes do Node.js. Para instalar o npm, basta abrir o terminal e executar o comando `npm install npm@latest -g`. Para verificar se a instalação foi bem sucedida, basta abrir o terminal e executar o comando `npm -v`. Caso a instalação tenha sido bem sucedida, a versão do npm instalada será exibida no terminal.

#### NestJS
O NestJS é um framework para desenvolvimento de aplicações backend em Node.js. Para instalar o NestJS, basta abrir o terminal e executar o comando `npm install -g @nestjs/cli`. Para verificar se a instalação foi bem sucedida, basta abrir o terminal e executar o comando `nest -v`. Caso a instalação tenha sido bem sucedida, a versão do NestJS instalada será exibida no terminal.

#### TypeScript
O TypeScript é um superset do Javascript que adiciona tipagem estática ao Javascript. Para instalar o TypeScript, basta abrir o terminal e executar o comando `npm install -g typescript`. Para verificar se a instalação foi bem sucedida, basta abrir o terminal e executar o comando `tsc -v`. Caso a instalação tenha sido bem sucedida, a versão do TypeScript instalada será exibida no terminal.

#### Prisma
O Prisma é um ORM (Object Relational Mapping) para Node.js e Typescript. Para instalar o Prisma, basta abrir o terminal e executar o comando `npm install -g prisma`. Para verificar se a instalação foi bem sucedida, basta abrir o terminal e executar o comando `prisma -v`. Caso a instalação tenha sido bem sucedida, a versão do Prisma instalada será exibida no terminal.

Com estes pré-requisitos instalados, o sistema pode ser executado. Para isso, basta seguir os passos descritos na seção **Execução do Sistema**.

## Execução do Sistema
Para executar o sistema, basta seguir os passos descritos a seguir:

### Clonar o repositório
Para clonar o repositório, basta abrir o terminal, ir até o diretório (pasta) onde você quer deixar salva as informações do projeto e executar o comando `git clone https://github.com/2023M8T1Inteli/grupo1.git`. Após a execução deste comando, o repositório será clonado no diretório atual.

### Instalar as dependências
Para instalar as dependências do projeto, basta abrir o terminal, ir até o diretório (pasta) onde o repositório foi clonado e executar o comando `npm install`. Após a execução deste comando, as dependências do projeto serão instaladas.

### Executar o projeto
Para executar o projeto, basta abrir o terminal, ir até o diretório (pasta) onde o repositório foi clonado e executar o comando `npm run start:dev`. Após a execução deste comando, o projeto será executado e estará disponível no endereço http://localhost:3000.

Por se tratar de uma aplicação que rodará em uma rede interna, é necessário que o computador que executará o projeto esteja conectado à rede interna da AACD. Toda a interface do projeto desenvolvido, após executada, está disponível no endereço `http://127.0.0.1:5500/src/frontend/pages/home.html`. A partir deste endereço, é possível acessar todas as funcionalidades do projeto, como demonstrado no vídeo de demonstração do projeto.


## Vídeo de Demonstração
O vídeo no link a seguir mostra o funcionamento do projeto quando instaladas e executadas as funções descritas anteriormente: https://drive.google.com/file/d/14UiRydGiY8HJWlW8AmXfx9uidy6iJiSO/view?usp=sharing
