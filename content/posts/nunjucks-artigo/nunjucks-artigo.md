---
title: Primeiros passos com o Nunjucks!
description: Neste artigo, vamos entender um pouco do nunjucks!
date: 2021-02-18T11:00:00.000Z
---

Olá, pessoal! Sou o João Pedro e hoje por meio deste artigo venho falar sobre uma tecnologia que utilizo muito, o nunjucks, e também fazer um CRUD com ele!

# Mas o que é uma template engine?

Template engine é basicamente para você deixar o seu html mais "dinâmico", por exemplo:

No back-end eu passo uma variável de valor "x" e para eu acessar essa variável através do html, eu posso utilizar uma template engine.

# Utilizando o nunjucks na prática!


O primeiro passo é criar um projeto node.js

> Mas como eu crio um projeto node.js?

É bem simples!!

Abra seu terminal, entre no diretório do projeto e digite:

__É necessário ter o node e o npm instalado!__
```bash
npm init -y
```
O "-y" serve para criar sem fazer nenhuma pergunta o arquivo package.json. Neste arquivos tem as informações deste projeto.

---

Depois que fizermos isso você pode abrir o diretório do projeto em um editor de sua preferência. No meu caso estarei usando o Vscode.

Depois vamos criar o arquivo server.js na raiz do projeto, neste arquivo vai ficar as rotas do projeto.

Para criar as rotas vamos precisar instalar o Express

O Express é um framework node.js para a criação de aplicações web e api's

Para instalar ele você deve rodar o seguinte comando no seu terminal.

```bash
npm install express
```

Após a instalação, no arquivo package.json,vai ter todas as dependências do seu projeto e também foi criada a pasta node_modules que é onde fica o código das dependências. 

![package.json](https://dev-to-uploads.s3.amazonaws.com/i/lrairc032r4mqkaqbzy6.PNG)
---

No arquivo server.js vamos escrever as nossas rotas!

```js
const express = require("express")
const server = express()

server.get("/", (request , response) => {
    return response.send("Está rota está funcionando!")
})
```

No código acima:

* Importamos o express no nosso projeto
* Criamos a variável "server" ela vai conter todas as nossas rotas.
* Fizemos uma rota do tipo GET que ao ser acessada ela nos retorna: "Está rota está funcionando!"

![editando o arquivo server.js](https://dev-to-uploads.s3.amazonaws.com/i/6id109ghiw1v6zy0um3n.PNG)

---

Agora podemos criar uma pasta chamada "views" nela vai conter todo o html do projeto.  

Na pasta views crie o arquivo "home.html" e digite:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <h1>CRUD com nunjucks</h1>
    <form action="/post" method="post">
        <input type="text" placeholder="Seu nome." name="name">
        <input type="email" name="email" placeholder="Seu email.">
        <button type="submit">Enviar!</button>
    </form>
    
</body>
</html>
```
---

No arquivo server.js, vamos importar o nunjucks mas primeiro precisamos ter ele instalado.

```bash
npm install nunjucks
```

Após a instalação vamos configurá-lo.

```js
const express = require("express")
const server = express()
const nunjucks = require("nunjucks")

// Configurando a pasta public.
server.use(express.static("public"))

// Configurando para receber dados do request.body.
server.use(express.urlencoded({extended:true}))
server.use(express.json());

// Config da template engine.
server.set("view engine", "njk")
nunjucks.configure("views", {
    express:server,
    autoescape:false,
    noCache:true,
})

server.get("/", (request , response) => {
    return response.render("home")
})

// Adicionando uma porta para o projeto.
server.listen(3333)
```
Repare que configuramos uma pasta chamada "public", mas por quê?

Caso você queira adicionar arquivos css você pode criar a pasta "styles", arquivos js você pode criar a pasta "scripts" e para imagens você pode criar a pasta "assets". Mas essas 3 pastas tem que estar dentro da pasta "public" e a "public" na raiz do projeto.E o nunjucks vai reconhecer ela.

---

Após tudo configurado renomeie o arquivo "home.html" para "home.njk".

No terminal rode:

```bash
node server.js
```

Abra o seu navegador e na barra de pesquisa digite:
> http://localhost:3333

Pronto! Conseguimos utilizar o nunjucks e o node para renderizar um arquivo html! 

Agora vamos fazer este CRUD! Mas antes vamos conhecer o nodemon!

---

# Nodemon

Caso você não queira escrever "node server.js" a cada alteração, você pode instalar o nodemon.

```bash
npm install nodemon -D
```
Após a instalação repare que no comando para instalar o nodemon tem o "-D".

> Para que ele serve?

O "-D" serve para que o nodemon só possa ser usado no ambiente de desenvolvimento.

Agora para startar o server digite "nodemon server.js" e pronto! O server será reestartado a cada alteração.

---

# CRUD com nunjucks

Na raiz do projeto vamos criar o arquivo "data.json" um arquivo onde vai ficar os dados que serão enviados, como se fosse um banco de dados e escrever o seguinte:

```json
{
    "dados":[]
}
```

---

No arquivo server.js vamos fazer a rota "/post" do tipo POST e importar o fs para escrever os dados no arquivo data.json .

```js
const data = require("./data.json")
const fs = require("fs")
const express = require("express")
const server = express()
const nunjucks = require("nunjucks")

server.use(express.static("public"))
server.use(express.urlencoded({extended:true}))
server.use(express.json());
server.set("view engine", "njk")
nunjucks.configure("views", {
    express:server,
    autoescape:false,
    noCache:true,
})

server.get("/", (request , response) => {
    return response.render("home")
})
server.post("/post", (request, response) => {
    const keys = Object.keys(request.body)
    // Vendo se nenhum dado está vazio.
    for (key of keys) {
        if (request.body[key] == '') {
            return response.send("Please, fill all fields")
        }
    }
    // Desestruturando o request.body e pegando os dados dele.
    let { name, email } = request.body
    
    // A Variável do ID.
    const id = Number(data.dados.length + 1)
    // Inserindo no json os dados.
    data.dados.push({
        id,
        name,
        email,
    })
    // Escrevendo no json as alterações.
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return response.send("White file error... :(")
        }
        return response.redirect("/")
    })
})
server.listen(3333)
```
---

Na rota GET do arquivo server.js vamos altera-la para também retornar uma variável.

```js

const data = require("./data.json")
const fs = require("fs")
const express = require("express")
const server = express()
const nunjucks = require("nunjucks")

server.use(express.static("public"))
server.use(express.urlencoded({extended:true}))
server.use(express.json());
server.set("view engine", "njk")
nunjucks.configure("views", {
    express:server,
    autoescape:false,
    noCache:true,
})

server.get("/", (request , response) => {
    // Retornando uma variável para o frontend.
    return response.render("home",{data: data.dados})
})
server.post("/post", (request, response) => {
    const keys = Object.keys(request.body)

    for (key of keys) {
        if (request.body[key] == '') {
            return response.send("Please, fill all fields")
        }
    }
    let { name, email } = request.body

    const id = Number(data.dados.length + 1)

    data.dados.push({
        id,
        name,
        email,
    })
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return response.send("White file error... :(")
        }
        return response.redirect("/")
    })
})
server.listen(3333)
```

---

Para finalizar, no arquivo "home.njk" vamos escrever:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <h1>CRUD com nunjucks</h1>
    <form action="/post" method="post">
        <input type="text" placeholder="Seu nome." name="name">
        <input type="email" name="email" placeholder="Seu email.">
        <button type="submit">Enviar!</button>
    </form>
    <div class="dados">
        <ul>
            <h1>Dados</h1>
             <!--
              Aqui ja estamos utilizando um método do nunjucks o for.
              -->
            {% for dados in data %}
                <ul>
                    <li>Nome:{{dados.name}}</li>
                    <li>Email:{{dados.email}}</li>
                </ul>
            {% endfor %}
            
        </ul>
    </div>
</body>
</html>


```
Repare que neste código acima temos um for, mas para que ele?

O for foi utilizado para percorrer a variável data que passamos no back-end e agora ele retorna outra variável com o nome dados

Ou seja

A cada dado ele vai retornar:

```html
<ul>
    <li>Nome:"o nome"</li>
    <li>Email:"o email"</li>
</ul>
```

---

Projeto Final com alguns dados:
![foto projeto final](https://dev-to-uploads.s3.amazonaws.com/i/416bcsbl3gk88hw1q2nl.PNG)

__Não se esqueça que a cada alteração rode "node server.js"__

Se este artigo realmente te ajudou compartilhe com seus amigos deixe o gostei se tiver e até a próxima!

Caso tenha alguma dúvida, confira o repositório no github que contem o todo código desenvolvido neste artigo!

[Link para o repositório.](https://github.com/jpbrab0/artigo-nunjucks)
