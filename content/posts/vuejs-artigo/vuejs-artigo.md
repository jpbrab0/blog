---
title: Fazendo uma todo list com VueJS.
description: Neste artigo, irei mostrar um pouco do Vue.js 3, fazendo uma todo list.
date: 2021-01-01T11:00:00.000Z
---
Fala galera! No primeiro artigo do ano de 2021 irei mostrar um pouco do Vue.js 3, fazendo uma todo list.

---

Pré-requisitos:
- Ter o [Node.js](https://nodejs.org/) instalado no pc;
- Conhecimento básico de HTML, Css e Javascript.

---

Para criar o projeto com vuejs já configurado precisamos do Vue CLI.

O Vue CLI é um ferramenta para auxiliar no desenvolvimento nos projetos Vue.js.

Existe duas formas de instala-lo:

Com npm:
```bash
npm install -g @vue/cli
```
Ou com yarn:
```bash
yarn global add @vue/cli
```

Com o Vue CLI já instalado podemos criar o nosso projeto vue.

```bash
vue create <nomedoprojeto>
```

Vamos nomear este projeto como ``todolist-vuejs``.

Quando você rodar esse comando vai aparecer essas 3 opções:

![Opções](https://dev-to-uploads.s3.amazonaws.com/i/8qgtg9rkstdnkxe076ni.png)

Neste artigo vamos usar a versão 3 do Vue.js.

---

Depois do Vue CLI criar o projeto, já podemos ver a estrutura de arquivos básica de um projeto vue.

![Estrutura de arquivos Vuejs 3](https://dev-to-uploads.s3.amazonaws.com/i/38vdhusyooo2kpsk3dyh.png)

---

No terminal se você rodar o comando:

```
npm run serve
```
Ou

```
yarn serve
```

Você estará rodando localmente o projeto vue.

---

Para começar o projeto vamos criar a lógica basica de uma todo list, adicionar uma tarefa.

No arquivo ``HelloWorld.vue`` vamos apagar todo o conteudo do bloco ``<template>`` e todo o conteudo do bloco ``<style>``

No bloco ``<template`` vamos fazer a estrutura html do projeto:

```html
<div class="app">
    <ol>
      <li >
        <p>Aprender Vue</p>
      </li>
    </ol>
    <div class="inputs">
      <input placeholder="Todo"/>
      <div class="buttons">
        <button >Adicionar Tarefa</button>
        <button>Remover Todas as tarefas</button>
      </div>
    </div>
  </div>
```
No javascript vamos implementar a lógica da todo list:

Antes de tudo no export default vamos adicionar a função ``data`` responsavel por renderizar os dados do projeto:

```js
data() {
    return {
      todos: [{ id: 1, text: "Aprender VueJs" }],
    };
}
```
No return criamos um objeto chamado ``todos`` que armazena as tarefas cadastradas.

Novamente no export default vamos adicionar um objeto chamado ``methods``:
```js
methods: {
    
},
```

Nele vamos criar os métodos da aplicação como remover tarefas e adicionar tarefas.

Vamos criar o nosso primeiro metodo o de adicionar tarefas:

```js
addTodo(text) {
    if (text !== " ") {
        this.todos.push({
           id: this.todos.length + 1,
           text,
        });
    }
}
```

E tambem de remover tarefas:

```js
removeTodos() {
      this.todos = [];
},
```

--- 

Para fazer tudo funcionar vamos adicionar atributos nas tags html:

1. No li vamos adicionar um atributo para renderizar todas as tarefas cadastradas, com o v-for:

```html
<ol>
    <li v-for="todo in todos" v-bind:key="todo.id">
        <p>{{ todo.text }}</p>
    </li>
</ol>
```
O ``v-bind:key="todo.id"`` é para cada li tem um id unico.

O ``{{ todo.text }}`` vai fazer o ``<p></p>`` renderizar o texto da tarefa.

---

Vamos fazer a lógica de adicionar tarefas no html com os atributos ``v-model`` e ``v-on:click``:

```html
<div class="inputs">
      <input placeholder="Todo" v-model="text" />
      <div class="buttons">
        <button v-on:click="addTodo(text)">Adicionar Tarefa</button>
        <button v-on:click="removeTodos()">Remover Todas as tarefas</button>
      </div>
</div>
```

O ``v-model`` vai nos auxiliar a pegar o dado do input de adicionar tarefa, guardando em uma variavel.

O ``v-on:click`` vai executar uma função caso o botão seja clicado.

---


Por fim vamos renomear o arquivo ``HelloWorld.vue`` para ``TodoList.vue``.

E também no arquivo ``App.vue`` vamos fazer as seguintes alterações:

No bloco ``<template>``:

Vamos Criar a tag da todo list:

```html
<template>
  <h1>TodoList com Vue.js 3!</h1>
  <TodoList/>
</template>
```

E no Javascript vamos renomear o import do componente:

```js
<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>
```
---

Depois de muito código é só rodar ``npm run serve``, para ver o resultado final!

---

Se este artigo realmente te ajudou compartilhe com seus amigos e amigas deixe o gostei(se tiver) e até a próxima!

Caso tenha alguma dúvida, confira o repositório no github que contem o todo código desenvolvido neste artigo!

[Link para o repositório](https://github.com/jpbrab0/artigo-vuejs3).
