# Exercicio-02

## 1. Qual a diferença entre tipagem dinâmica e tipagem estática?

R: A tipagem dinâmica é mais flexível, onde a verificação de tipos ocorre em tempo de execução (runtime), não necessitando que o usuário explicite os tipos das variáveis durante a escrita do código; ou então, o usuário pode mudar facilmente o tipo de uma variável ao decorrer do programa. De forma contrária, a tipagem estática requisita que o usuário explicite no código o tipo de cada variável e retorno de função, na qual a verificação de tipos ocorre em tempo de compilação.
## 2. Qual o principal problema do uso de tipagem dinâmica?

R: A falta de agilidade, devido à tarefa do interpretador de realizar a inferência de tipos durante a execução de um programa.
## 3. Pesquise um exemplo na internet em que a tipagem dinâmica pode ser problemático.

R: Nas requisições de API, por exemplo, se uma requisição da utilização de uma função for tipada de forma errada, haverá problemas na execução de um programa. Esse problema será identificado somente em tempo de execução, o que é algo problemático
## 4. Pesquise e exemplifique com um exemplo porque dizemos que a linguagem C, mesmo tendo tipagem estática, possui tipagem fraca.

A linguagem C, mesmo sendo estática, é considerada de tipagem "fraca" pois realiza conversão de tipos automaticamente em alguns casos. O exemplo a seguir demonstra que mesmo atribuindo um valor inteiro a uma variável, ele o converte automaticamente para um float:

``` C
#include <stdio.h>

int main(){
    float a = 1;
    float b = 2;

    printf("%f", a+b);
    return 0;
}
```

```Saida
3.000000
```

## 5. Poderíamos dizer que a tipagem do TypeScript é fraca por uma variável do tipo _number_ aceitar tanto inteiros como ponto flutuante?

R: Não, esse não é um critério para a definição de tipagem fraca em linguagens de programação.
## 6. Reescreva o exemplo abaixo, mantendo a quebra de linhas usando template strings e os valores Ely, 120.56 e TypeScript venham de variáveis declaradas separadamente e “interpoladas” na string:
```
Ely
My payment time is 120.56
and
my preffered language is TypeScript
```

