import { Cliente } from "./cliente";
import { Conta } from "./conta";


class Banco {
    clientes: Cliente[];
    contas: Conta[];

    constructor() {
        this.contas = [];
        this.clientes = [];
    }

    inserirConta(conta: Conta): void {
        for (let c of this.contas){
            if (c.id === conta.id || c.numero === conta.numero){
                console.log("Já existe uma conta com esse ID ou numero!!!");
                return;
            }
        }

        console.log(`A conta ${conta.numero} foi criada com sucesso.`);
        this.contas.push(conta);
    }

    inserirCliente(cliente: Cliente): void{
        for(let c of this.clientes){
            if (c.id === cliente.id || c.cpf === cliente.cpf){
                console.error("Já existe um cliente com esse ID ou CPF!!");
                return;
            }
        }
        
        this.clientes.push(cliente);
        console.log(`O cliente ${cliente.nome} foi adicionado com sucesso.`);
    }

    consultarConta(numero: string): Conta {
        let contaProcurada!: Conta;

        for (let conta of this.contas) {
            if (conta.numero == numero) {
                contaProcurada = conta;
                break;
            }
        }

        return contaProcurada;
    }

    consultarCliente(cpf: string): Cliente {
        let clienteDesejado!: Cliente;
        for (let cliente of this.clientes){
            if (cliente.cpf === cpf){
                clienteDesejado = cliente;
                break; 
            }
        }

        return clienteDesejado;
    }

    /*c) Associar um cliente a uma conta
    • Método: associarContaCliente(numeroConta: string, cpfCliente:
    string): void
    • Procure o cliente e a conta com os dados fornecidos e associe-os,
    respeitando considernado que o cliente não pode ter a mesma conta
    adicionada mais de uma vez. */

    associarContaCliente(numeroConta: string, cpfCliente: string) : void{
        let conta: Conta = this.consultarConta(numeroConta);
        let cliente: Cliente = this.consultarCliente(cpfCliente);

        if (!conta || !cliente){
            console.error("Cliente ou conta não encontrados");
            return;
        }

        for(let clienteBanco of this.clientes){
            for(let contaCliente of clienteBanco.listarContas()){
                if (contaCliente.numero === conta.numero && clienteBanco.id === cliente.id){
                    console.error("Essa conta já está associada a um cliente!!");
                    return;
                }
            }
        }

        
        cliente.adicionarConta(conta);
        conta.dono = cliente;
        console.log(`Conta ${conta.numero} foi associada ao cliente ${conta.dono.nome}`);
    }

    /*d) Listar contas de um cliente
    • Método: listarContasCliente(cpf: string): Conta[]
    • Retorne todas as contas associadas ao cliente cujo CPF foi
    informado.*/

    listarContasCliente(cpf: string): Conta[] {
        let cliente = this.consultarCliente(cpf);

        if (!cliente){
            console.error("Cliente não encontrado!");
            return [];
        }

        return this.contas.filter(conta => conta.dono.cpf === cliente.cpf);
    }

    /*e) Totalizar saldo por cliente
    • Método: totalizarSaldoCliente(cpf: string): number
    • Calcule e retorne o saldo total de todas as contas de um cliente.
    */

    totalizarSaldoCliente(cpf: string): number | undefined {
        let cliente = this.consultarCliente(cpf);
        
        if (!cliente){
            console.error("Cliente não encontrado!!");
            return;
        }
        let soma: number = 0;
        for (let contaCliente of cliente.listarContas()){
            soma += contaCliente.consultarSaldo();
        }
        return soma;
        
    }

    depositar(numero: string, valor: number): void {
        let contaProcurada: Conta = this.consultarConta(numero);
        if (contaProcurada){
            contaProcurada.depositar(valor);
        }
    }
}

let banco: Banco = new Banco();
let cliente1 = new Cliente(1, "Jota", "111.222.333-44", new Date());
let cliente2 = new Cliente(2, "Jotao", "111.222.333-45", new Date());
let conta1 = new Conta(1,"1234", 500.0);
let conta2 = new Conta(2,"1235", 500.0);

banco.inserirCliente(cliente1);
banco.inserirCliente(cliente2);
banco.inserirConta(conta1);
banco.inserirConta(conta2);
banco.associarContaCliente("1234", "111.222.333-44");
banco.associarContaCliente("1235", "111.222.333-44");
banco.depositar("1234", 500);
banco.depositar("1235", 700);
console.log(banco.consultarConta("1234").consultarSaldo());
console.log(banco.consultarConta("1235").consultarSaldo());


