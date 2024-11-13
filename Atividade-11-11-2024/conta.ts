class Conta {
    numero: string;
    saldo:number;

    constructor (numero: string, saldo: number){
        this.numero = numero;
        this.saldo = saldo;
    }

    sacar(valor:number):void{
        this.saldo -= valor;
    }

    depositar(valor:number): void{
        this.saldo += valor;
    }

    consultarSaldo(): number {
        return this.saldo;
    }

    transferir(destinyAccount: Conta, valor:number) : void {
        this.sacar(valor) // Tira a quantia desse objeto
        destinyAccount.depositar(valor); // "Aumenta" o valor da conta destino
    }
}


// 5 . Considerando o uso da classe Conta apresentada em aula e seu uso abaixo: 
let c1: Conta = new Conta("1",100); 
let c2: Conta = new Conta("2",100); 
let c3: Conta; 
c1 = c2; 
c3 = c1; 
c1.sacar(10); 
c1.transferir(c2,50); 
console.log(c1.consultarSaldo()); 
console.log(c2.consultarSaldo()); 
console.log(c3.consultarSaldo()); 

/*
a. Qual o resultado dos dois "prints"? Justifique sua resposta.  
R: Todos os prints mostram o valor 90. Isso acontece porque, na hora de transferir,
um valor é sacado da conta origem e adicionado na conta destino, e, graças ao fato
de c1,c2 e c3 apontarem para o mesmo objeto na memória, o valor é debitado e depois depositado
no mesmo objeto, "anulando" a transação.

b. O que acontece com o objeto para o qual a referência c1 apontava?
R: É perdido na memória. O garbage collector se encarrega de liberar a memória alocada
para esse endereço agora inacessível. 
*/