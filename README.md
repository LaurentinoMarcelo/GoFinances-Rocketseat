# GoFinances-Rocketseat
## O gofinances é uma ótima alternativa para acompanhamento de transações financeiras. 
Ele fornece uma descrição dos registros criados e um balanço dos valores, para você, de forma 
simples e elegante.

<h1 align="center">
  💲GoFinances💲 
</h1>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-layout">Layout</a> • 
 <a href="#-funcionalidade">Funcionalidades</a> • 	
 <a href="#-tecnologias">Tecnologias</a>  
</p>

---
## ⚙Sobre

Autenticação

O projeto utiliza o sistema de autenticação OAuth 2 que é um protocolo de autorização que permite que uma aplicação se autentique em outra. Para que isso aconteça, uma aplicação pede permissão de acesso para um usuário, sem que para isso ela tenha acesso a alguma senha dele. O usuário pode conceder ou não o acesso à aplicação.

Funcionalidades

Basicamente o aplicativo consiste de três telas sendo a primeira o Dashaboard, que contem o resumo das transações de entrada e sáida, a segunda tela é a de cadastro de despesa ou receite, e por fim a ultima tela que exibe um gráfico em pizza de todas as categorias de despezas.


---


## 📱Aplicanção

[![Watch the video](https://img.youtube.com/vi/HopMgroCGQY/hqdefault.jpg)](https://youtu.be/HopMgroCGQY)
  
  ---     

## 🎨Layout

O layout foi fornecido pala Rocketseat 
- [Figma](https://www.figma.com/file/UQuhez6vG5kLn4164ljEGJ/RentX-Ignite-(Copy)?node-id=0%3A1)

  --- 
  
### 🛠Tecnologias Utilizadas

As seguintes ferramentas foram usadas na construção do projeto:

- [TypeScript](https://www.typescriptlang.org/)
- [React Native](https://reactnative.dev/)
- [Styled-components](https://styled-components.com/docs/basics)
- [React-Navigation](https://reactnavigation.org/)

### 🛠Requisitos de software

- Instalar o [yarn](https://yarnpkg.com/)
- Instalar e configurar o [Android Studio](https://developer.android.com/studio)
- Baixar e configurar o [backend] da aplicação(https://github.com/LaurentinoMarcelo/GoFinances-Rocketseat)

---

<h1>
  Como utilizar ⚠️
</h1>

 <h2> Para rodar o projeto, basta executar os seguintes comandos, em seu terminal com git <h2/>
 
 
 ```
  # Faça um clone do repositório
  
  git clone <link-do-repositório>

  # Navegue até a pasta do projeto e baixe as dependências<h3/>

  cd gofinance && yarn

  # Rode o metro bundler<h3/>

  yarn start
 
  # E, em outro terminal, execute

  yarn android # ou yarn ios
 ```
  
  
  <h4> Obs: É muito importante que o back-end esteja rodando, quando você inciar o app </h4>
  
  - Nota do autor
  
  <h4> Dentro da pasta do projeto, em src/services/api.ts, você vai encontrar a configuração que conecta o app ao back-end. Ele vai ser assim: </h4>
  
  
 ```
  import axios from 'axios';

  const api = axios.create({
     baseURL: 'http://<um-ip-qualquer>:3333/',
   });

   export default api;
 ```
    
    
  <h4>Se você estiver rodando o projeto dentro do Android Studio, troque o campo "um-ip-qualquer", junto com os sinais de maior e menor, 
  por "10.0.2.2", que equivale ao localhost, dentro da plataforma. Porém, se você decidir rodar o app em seu dispositivo físico, subistitua esse campo
  pelo ip atual do seu computador.</h4>
  
  ## 📝Licença
  <h4> Esse projeto se encontra sob a licença MIT. Para mais informações, acesse o arquivo LICENSE.</h4>

