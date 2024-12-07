import { Conta } from "./conta";
/*1) Classe Cliente 
Crie uma classe Cliente com os seguintes atributos: 
• id: Identificador único do cliente (número). 
• nome: Nome completo do cliente (string). 
• cpf: CPF único do cliente (string). 
• dataNascimento: Data de nascimento do cliente (Date). 
• contas: Array de contas associadas ao cliente.*/

export class Cliente { 
    id!: number; 
    nome: string; 
    cpf: string; 
    dataNasc: Date; 
    contas: Conta[]; 

    constructor(nome: string, cpf: string, dataNasc: Date) { 
        this.nome = nome; 
        this.cpf = cpf; 
        this.dataNasc = dataNasc; 
        this.contas = []; 
    } 
    
    adicionarConta(conta: Conta): void { 
        for (let c of this.contas) { 
            if (c.id === conta.id || c.numero === conta.numero) { 
                console.log("Conta com o mesmo id ou número já está associada a este cliente"); 
                return;
            } 
        } 
        this.contas.push(conta); 
    } 
    
    // listar as contas do cliente 
    listarContas(): Conta[] { 
        return this.contas; 
    } 

    // calcular o saldo total do cliente 
    totalizarSaldo(): number {
        return this.contas.reduce((total, conta) => total + conta.saldo, 0);
    }
}