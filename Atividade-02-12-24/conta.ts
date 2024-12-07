import { Cliente } from "./cliente";
/*2) Classe Conta
Atualize a classe Conta para incluir os seguintes atributos:
• id: Identificador único da conta (número).
• cliente: Cliente associado à conta. */

export class Conta {
    id: number;
    dono!: Cliente;
    numero: string;
    saldo: number;

    constructor(id:number, numero: string, saldo: number) {
        this.id = id;
        this.numero = numero;
        this.saldo = saldo;
    }

    sacar(valor: number): void {
        this.saldo = this.saldo - valor;
    }

    depositar(valor: number): void {
        this.saldo = this.saldo + valor;
    }

    consultarSaldo(): number {
        return this.saldo
    }

    transferir(contaDestino: Conta, valor: number): void {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }
}