---
title: Entendendo Pattern Matching no elixir
description: Neste artigo irei explicar um pouco sobre o pattern matching no elixir!
date: 2021-03-17T11:00:00.000Z
---
Eae galera! Neste artigo irei explicar um pouco sobre o pattern matching no elixir!

## Afinal o que é o pattern matching?

O pattern matching é uma forma de desestruturar facilmente os tipos de dados, tuplas e listas. Támbem é um dos fundamentos da recursividade no Elixir.

## Váriaveis no Elixir

> Ao longo do artigo iremos ver sobre o pattern matching e para entender os códigos escritos entenda um pouco sobre as váriaveis no elixir.

No elixir as variaveis não são atribuidas por um valor.

Para explicar melhor aqui está um exemplo:

``variavel = 1``

Para a variavel ser igual a 1, na matemática se, por exemplo ``x = 1`` o que o x tem que valer para ser equivalente a 1? Ele tem que ser 1

E acontece a mesma coisa no elixir, por isso as váriaveis são imutaveis.

E acabamos de ver pattern matching nas váriaveis do elixir.

---

## Rodando projetos elixir

Para rodar o nosso projeto iremos entrar no modo interativo do elixir(mesmo ele sendo uma lang compilada, ele tem um modo interativo).

```bash
iex -S mix
```

E depois

Vai digitar o nome do módulo(no nosso caso ``PatternMatchingArtigo``) e também o nome da função que você quer executar.

```bash
iex> PatternMatchingArtigo.<nome da função>(<parametros>)
```

E é só trocar esses <> pelo nome da função e os parametros.

---

## Utilizando o pattern matching na prática!

Pré-requesitos: 
    
* [Elixir](https://elixir-lang.org/install.html)



Primeiro nós vamos criar o projeto em elixir com o mix:
```bash 
mix new pattern_matching_artigo 
```



Em `lib/pattern_matching_artigo.ex`,
vamos apagar todas as funções deixando apenas o defmodule
```elixir
defmodule PatternMatchingArtigo do

end
```

Depois de apagarmos todas as funções, vamos criar uma função chamada `call()` que vai ter um parametro que vai ser uma lista:

```elixir
defmodule PatternMatchingArtigo do
    def call(list) do
    
    end
end
```

No elixir não é possivel pegar o valor de uma lista com ``lista[1]``, por isso vamos ver como funciona o pattern matching com as listas.


Para percorrer a lista vamos criar uma função chamada ``count_length`` com um paremetro chamado ``[head | tail]``:

```elixir
    def count_length([head | tail]) do

    end
```

> O que seria esse ``[head | tail]``?

Em elixir uma forma de pegar os elementos de uma lista é utilizando essa forma. O head é o primeiro elemento da lista, e o tail é o corpo da lista, ou seja, todos os outros elementos da lista.

Por exemplo:

```elixir
    def count_length([head | tail]) do
        IO.inspect(head)

        IO.inspect(tail)
    end
```

Se a gente rodar esta função passando uma lista ``[1,2,3]`` 

```bash
iex -S mix

iex> PatternMatchingArtigo.count_length([1,2,3])
```

vai retornar:

```bash
1
[2,3]
```

Sabendo disso podemos continuar nosso projeto:

Para contar a quantidade de uma lista temos que ter um contador, então vamos passar ele como parametro:

```elixir
def count_length([head | tail], count) do
    IO.inspect(head)

    IO.inspect(tail)
end
```

Já que não iremos usar o head para fazer a contagem podemos colocar um _ na frente dessa váriavel. Isso indica que iremos receber essa variavel como parametro mas não vamos utiliza-lo.

E também vamos incrementar a contagem.

```elixir
def count_length([_head | tail], count) do
    count = count + 1
end
```

Mas como estamos atribuindo um valor ao uma váriavel, sendo que no elixir as váriaveis são imutaveis?

Na verdade não estamos reatribuindo um valor a uma variavel e sim estamos criando uma nova variavel chamada count.

Se executarmos esse código com o iex, passando como parametro o count que vai ser o número que vai iniciar a contagem da lista.

```bash
iex> PatternMatchingArtigo.count_length([1,2,3], 0)
```

Ele vai retornar:

```bash
1
```

Agora vamos aplicar recursividade nesta função:

```elixir
def count_length([head | tail], count) do
    count = count + 1

    # Passando tail e a contagem como parametro.
    count_length(tail, count)
end
```

> Se rodarmos essa função novamente ele vai dar um erro que está passando uma lista vazia

Podemos resolver adicionando outra função ``filter_length()``

```elixir
def count_length([], count), do: count
```
E o que esta função faz? 

Esta função verifica se a lista está vazia, e se estiver vai retornar a contagem total da lista. 

Caso esteja com valores nesta lista   ele vai adicionar 1 na contagem e vai executar denovo a função até acabar de percorrer a lista.

E também acabamos de ver Pattern Matching com funções!


E por fim na função ``call()``, vamos adicionar um paremetro chamado ``list`` e executar a função ``count_length``.

```elixir
def call(list) do
    count_length(list, 0)
end
```

Assim, finalizamos nosso mini projeto de contar o tamanho das listas com Pattern Matching e também utilizando recursão!

---

O Pattern Matching funciona também com tuplas

Por exemplo:

```elixir
defp print_content_file({:ok, content}), do: content

defp print_content_file({:error, reason}), do: reason
```

Nesta função privada(``função privada no elixir é defp e uma função pública é def``) ele vai pegar uma tupla que retorna :ok, e algum conteudo e vai retornar esse conteudo.

Se retornar um erro vai retornar um erro.

E assim utilizamos pattern matching com listas, tuplas, funções e também tratamos de erros.

---

Caso tenha alguma duvida do código feito durante o artigo acesse o [repositório](https://github.com/jpbrab0/pattern-matching-artigo) que contem o projeto feito durante esse artigo.

---

Esse artigo foi um pouco longo mas espero que você tenha gostado!

Se gostou do artigo deixe o like, compartilhe com os amigos e comente o que achou do artigo!

Até a proxima!