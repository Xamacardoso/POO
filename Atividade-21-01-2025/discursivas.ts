/*1) Enumere  os  3  tipos  mais  comuns  de  tratamento  de  erros  e  exemplifique  com 
códigos seus ou pesquisados na internet.*/

// 1 - Ignorar o erro
function dividir(a: number, b: number): number {
    if (b === 0) {
        return 0; // aqui o erro é ignorado e retorna 0 como resultado padrão
    }
    return a / b;
}

let resultado = dividir(10, 0);
console.log("o resultado deu:", resultado);


// 2 - Uso de try-catch
try {
    let dividendo = 10;
    let divisor = Math.floor(Math.random() * 4); // pega um numero de 0 a 3 para dividir

    // se o numero aleatorio for zero, o código da erro
    if (divisor === 0) {
        throw new Error("Divisão por zero!");
    }

    console.log(`Resultado da divisão: ${dividendo} / ${divisor} = `,dividendo / divisor);

} catch (erro){
    console.error("Erro: não pode dividir por zero!");
}

// 3 - Retorno de codigo de erro
function novaDivisao(a: number, b: number): number | null {
    if (b === 0) {
        return null; // codigo do erro para divisão por zero
    }
    return a / b;
}

let resultado3 = novaDivisao(10, 0);
if (resultado === null) {
    console.error("Erro: divisão por zero não é permitida.");
} else {
    console.log("Resultado:", resultado);
}

/*2) Explique por que cada um dos 3 métodos acima possui limitações de uso*/
/*
1 - Ignorar o erro:
Ignorar o erro pode trazer comportamentos inesperados no sistema e até
mesmo quebrar a aplicação. Sem contar os inumeros problemas de segurança
que isso pode trazer. Além disso, é uma má pratica na programação.

2 - Uso de try-catch
O uso do try catch, mesmo permitindo que o programa continue, pode
aumentar a complexidade do codigo, levar a problemas de depuração
se o manejo das exceções for inadequado ou trazer problemas de performance.

3 - Retorno de codigo de erro
O código fica muito verboso, um novo código tem que ser criado a cada
nova possibilidade de erro. Além disso o programador teria que se
lembrar de todos os codigos de erro que podem ser retornados, o que
é dificil e dependendo da complexidade do sistema é bem impossivel
 */


/** 3) Com  o  código  repassado,  crie  duas  contas  e  teste  o  método  transferir  de  modo 
que a conta a ser debitada não possua saldo suficiente. Explique o que ocorreu. 

R = A transferência não foi feita, pois a conta a ser debitada não tinha saldo suficiente.
Isso lançou uma exceção, que foi capturada no bloco catch, permitindo que a aplicação não
quebrasse e fosse continuada normalmente.
*/

/**4) Instancie uma classe App e, caso necessário, crie duas contas. Acesse a opção de 
transferir com valor alto o suficiente para lançar uma exceção/erro.  Verifique que o 
lançamento  da  exceção  foi  “propagado”  para  o  método  conta.transferir(), 
banco.transferir() e App.menu()? Como você avalia a confiabilidade dessa 
implementação? 

R = Avalio essa implementação como confiável, pois está encapsulando a lógica
de negócios que existe dentro da classe conta. Além disso, o tratamento de erros
ocorre de forma satisfatória.
*/