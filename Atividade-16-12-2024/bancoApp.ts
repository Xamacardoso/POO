import { Banco, Conta, Cliente } from "./banco";
import prompt from "prompt-sync";

// Ultimo passo: Refatoração do aplicativo em uma classe
class Aplicativo {
    private banco: Banco;
    input = prompt();
    opcao!: string;

    constructor() {
        this.banco = new Banco();
    }

    exibirMenu() : void{
        console.log('\nBem-vindo! Escolha uma opção:');
        console.log('Contas:');
        console.log('1 - Inserir    2 - Consultar  3 - Sacar');
        console.log('4 - Depositar  5 - Excluir  6 - Transferir');
        console.log('7 - Totalizações');
        console.log('\nClientes:');
        console.log('8 - Inserir    9 - Consultar   10 - Associar');
        console.log('11 - Total aplicado por cliente   12 - Mudar titularidade');
        console.log('13 - Excluir Cliente');
        console.log('\nExtras:');
        console.log('14 - Exibir contas sem cliente  15 - Ordem bancária');
        
        console.log('0 - Sair');
    }

    inserirConta() : void{
        const numero = this.input('Digite o numero da conta: ');
        const titular = this.input('Digite o titular da conta: ');
        const saldo = parseFloat(this.input('Digite o saldo da conta: '));
        this.banco.inserirConta(new Conta(numero, saldo));
    }

    consultarConta() : void{
        const numero = this.input('Digite o numero da conta: ');
        const conta : Conta = this.banco.consultarConta(numero);
        if (conta) {
            console.log("\n=== Extrato da Conta ===");
            console.log(`ID: ${conta.id}`);
            console.log(`Numero da conta: ${conta.numero}`);
            console.log(`Titular: ${conta.cliente ? conta.cliente.nome : "Nao associado"}`);
            console.log(`Saldo: ${conta.saldo}`);
        }
    }

    sacar() : void{
        const numero = this.input('Digite o numero da conta: ');
        const valor = parseFloat(this.input('Digite o valor do saque: '));
        this.banco.sacar(numero, valor);
    }

    depositar() : void{
        const numero = this.input('Digite o numero da conta: ');
        const valor = parseFloat(this.input('Digite o valor do deposito: '));
        this.banco.depositar(numero, valor);
    }

    excluirConta() : void{
        const numero = this.input('Digite o numero da conta: ');
        this.banco.excluirConta(numero);
    }

    transferir() : void{
        const numeroOrigem = this.input('Digite o numero da conta de origem: ');
        const numeroDestino = this.input('Digite o numero da conta de destino: ');
        const valor = parseFloat(this.input('Digite o valor da transferencia: '));
        this.banco.transferir(numeroOrigem, numeroDestino, valor);
    }

    totalizarSaldo() : void{
        const total : number = this.banco.obterTotalDinheiroDepositado();
        console.log(total ? `Total depositado no banco: R$ ${total.toFixed(2)}` : "Nenhuma conta cadastrada");
    }

    inserirCliente() : void{
        const nome = this.input('Digite o nome do cliente: ');
        const cpf = this.input('Digite o CPF do cliente: ');
        const dataNascimento = this.input('Digite a data de nascimento do cliente (AAAA-MM-DD): ');
        this.banco.inserirCliente(new Cliente(nome, cpf, new Date(dataNascimento)));  
    }

    consultarCliente() : void{
        const cpf = this.input('Digite o CPF do cliente: ');
        const cliente = this.banco.consultarCliente(cpf);
        console.log(cliente ? `Cliente encontrado: ID ${cliente.id}, Nome: ${cliente.nome}, CPF: ${cliente.cpf}` 
        : "Cliente nao encontrado.");
    }

    associarContaCliente() : void{
        const numero = this.input('Digite o numero da conta: ');
        const cpf = this.input('Digite o CPF do cliente: ');
        this.banco.associarContaCliente(numero, cpf);
    }

    totalizarAplicadoPorCliente() : void{
        const cpf = this.input('Digite o CPF do cliente: ');
        const total : number = this.banco.totalizarSaldoCliente(cpf);
        console.log(total ? `Total aplicado pelo cliente: R$ ${total.toFixed(2)}` : "Nenhuma conta cadastrada");
    }

    mudarTitularidade() : void{
        const numero = this.input('Digite o numero da conta: ');
        const cpf = this.input('Digite o CPF do cliente a reassociar: ');
        this.banco.mudarTitularidadeConta(numero, cpf);
    }

    excluirCliente() : void{
        const cpf = this.input('Digite o CPF do cliente: ');
        this.banco.excluirCliente(cpf);
    }

    exibirContasSemCliente() : void{
        const contas = this.banco.obterContasSemCliente();

        if (contas.length == 0) {
            console.log("Nenhuma conta sem titular.");
            return;
        }

        console.log("Contas sem titular:");
        contas.forEach(conta => {
            console.log(`ID: ${conta.id}, Numero: ${conta.numero}, Saldo: ${conta.saldo}`);
        });

        const opcao: string = this.input("\nDeseja associar um cliente a uma dessas contas? (S/N): ");

        if (opcao.trim().toUpperCase() == "S") {
            this.associarContaCliente();
        }
    }

    ordemBancaria() : void{
        const contaOrigem = this.input('Digite o numero da conta de origem: ');
        const valorTransf = parseFloat(this.input('Digite o valor unitario da transferencia da ordem bancaria: '));
        const contasDestino: string[] = this.input('Digite os numeros das contas de destino separados por VIRGULA: ').split(",");
        
        this.banco.ordemBancaria(contaOrigem, contasDestino, valorTransf);
    }

    executar() : void{
        do {
            this.exibirMenu();
            this.opcao = this.input('Escolha uma opção: ');
            switch (this.opcao) {
                case '1': this.inserirConta(); break;
                case '2': this.consultarConta(); break;
                case '3': this.sacar(); break;
                case '4': this.depositar(); break;
                case '5': this.excluirConta(); break;
                case '6': this.transferir(); break;
                case '7': this.totalizarSaldo(); break;
                case '8': this.inserirCliente(); break;
                case '9': this.consultarCliente(); break;
                case '10': this.associarContaCliente(); break;
                case '11': this.totalizarAplicadoPorCliente(); break;
                case '12': this.mudarTitularidade(); break;
                case '13': this.excluirCliente(); break;
                case '14': this.exibirContasSemCliente(); break;
                case '15': this.ordemBancaria(); break;
                case '0': break;
                default:
                    console.log("Opção inválida!");
            }
            this.input("Pressione <ENTER> para continuar...");
            console.clear();
        } while (this.opcao != '0');
    }
}