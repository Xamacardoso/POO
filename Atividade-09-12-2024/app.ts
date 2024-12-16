import prompt from "prompt-sync";
import { Conta, Cliente, Banco } from "./banco";
class AppBancario {
    banco: Banco;

    constructor(){
        this.banco = new Banco();
    }
}
let input = prompt();
let b: Banco = new Banco();
let opcao: string = '';

do {
    exibirMenu();
    opcao = input("Opção: ");
    switch (opcao) {
        case "1":
            inserirConta();
            break;
        case "2":
            consultarConta();
            break;
        case "3":
            sacar();
            break;
        case "4":
            depositar();
            break;
        case "5":
            excluirConta();
            break;
        case "6":
            transferir();
            break;
        case "7":
            totalizacoes();
            break;
        case "8":
            inserirCliente();
            break;
        case "9":
            consultarCliente();
            break;
        case "10":
            associarContaCliente();
            break;
        case "11":
            totalizarSaldoCliente();
            break;
        case "12":
            mudarTitularidadeConta();
            break;
        case "13":
            excluirCliente();
            break;
        case "14":
            exibirContasSemCliente();
            break;
        case "15":
            ordemBancaria();
            break;
        
        case "0":
            console.log("Saindo...");
            break;
        default:
            console.log("Opção inválida!");
    }
    input("Operação finalizada. Pressione <Enter> para continuar.");
} while (opcao != "0");

console.log("Aplicação encerrada.");

function exibirMenu(): void {
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

function inserirConta(): void {
    console.log("\nCadastrar conta:");
    let numero: string = input('Digite o número da conta: ');
    let saldo: number = parseFloat(input('Digite o saldo inicial da conta: '));
    let conta: Conta = new Conta(numero, saldo); // Cliente será associado posteriormente
    b.inserirConta(conta);
    console.log("Conta cadastrada com sucesso!");
}

function sacar(): void {
    console.log("\nSaque:");
    let numero: string = input('Digite o número da conta: ');
    let valor: number = parseFloat(input('Digite o valor do saque: '));
    b.sacar(numero, valor);
    console.log("Saque realizado.");
    exibirExtrato(numero);
}

function depositar(): void {
    console.log("\nDepósito:");
    let numero: string = input('Digite o número da conta: ');
    let valor: number = parseFloat(input('Digite o valor do depósito: '));
    b.depositar(numero, valor);
    console.log("Depósito realizado.");
    exibirExtrato(numero);
}

function transferir(): void {
    console.log("\nTransferência:");
    let numeroOrigem: string = input('Digite o número da conta de origem: ');
    let numeroDestino: string = input('Digite o número da conta de destino: ');
    let valor: number = parseFloat(input('Digite o valor da transferência: '));
    b.transferir(numeroOrigem, numeroDestino, valor);
    console.log("Transferência realizada.");
    console.log("\nExtrato da conta de origem:");
    exibirExtrato(numeroOrigem);
    console.log("\nExtrato da conta de destino:");
    exibirExtrato(numeroDestino);
}

function consultarConta(): void {
    console.log("\nConsultar conta:");
    let numero: string = input('Digite o número da conta: ');
    exibirExtrato(numero);
}


function exibirExtrato(numero: string): void {
    const conta = b.consultarConta(numero);
    if (conta) {
        const cliente = conta.cliente;
        console.log("\n=== Extrato da Conta ===");
        console.log(`ID: ${conta.id}`);
        console.log(`Número da conta: ${conta.numero}`);
        console.log(`Saldo: ${conta.saldo}`);
        if (cliente) {
            console.log("\n=== Dados do Cliente ===");
            console.log(`ID: ${cliente.id}`);
            console.log(`Nome: ${cliente.nome}`);
            console.log(`CPF: ${cliente.cpf}`);
            /*
            console.log("Contas associadas:");
            cliente.contas.forEach((c) =>
                console.log(`- Conta: ${c.numero}, Saldo: ${c.saldo}`)
            );
            */
        } else {
            console.log("Cliente: Não associado.");
        }
        console.log("=========================\n");
    } else {
        console.log("Conta não encontrada para exibir extrato.");
    }
}


function excluirConta(): void {
    console.log("\nExcluir conta:");
    let numero: string = input('Digite o número da conta: ');
    b.excluirConta(numero);
    console.log("Conta excluída com sucesso!");
}


function totalizacoes(): void {
    console.log("\nTotalizações:");
    console.log(`Quantidade de contas: ${b.obterQuantidadeDeContas()}`);
    console.log(`Total depositado no banco: ${b.obterTotalDinheiroDepositado()}`);
    console.log(`Média de saldo das contas: ${b.calcularMediaSaldoContas()}`);
}

function inserirCliente(): void {
    console.log("\nCadastrar cliente:");
    let nome: string = input('Digite o nome do cliente: ');
    let cpf: string = input('Digite o CPF do cliente: ');
    let dataNascimento: Date = new Date(input('Digite a data de nascimento (AAAA-MM-DD): '));
    let cliente: Cliente = new Cliente(nome, cpf, dataNascimento);
    b.inserirCliente(cliente);
    console.log("Cliente cadastrado com sucesso!");
}

function consultarCliente(): void {
    console.log("\nConsultar cliente:");
    let cpf: string = input('Digite o CPF do cliente: ');
    let cliente = b.consultarCliente(cpf);
    if (cliente) {
        console.log(`Cliente encontrado: ID ${cliente.id}, Nome: ${cliente.nome}, CPF: ${cliente.cpf}`);
    } else {
        console.log("Cliente não encontrado.");
    }
}

function associarContaCliente(): void {
    console.log("\nAssociar conta a cliente:");
    let numeroConta: string = input('Digite o número da conta: ');
    let cpfCliente: string = input('Digite o CPF do cliente: ');
    b.associarContaCliente(numeroConta, cpfCliente);
    console.log("Conta associada ao cliente com sucesso!");
}

function totalizarSaldoCliente(): void {
    console.log("\Totalizar saldo por cliente:");
    let cpfCliente: string = input('Digite o CPF do cliente: ');
    let total = b.totalizarSaldoCliente(cpfCliente);
    console.log("Total: " + total);
}

function mudarTitularidadeConta(): void {
    console.log("\nMudar titularidade da conta:");
    let numeroConta: string = input('Digite o número da conta: ');
    let cpfNovoTitular: string = input('Digite o CPF do novo titular: ');

    b.mudarTitularidadeConta(numeroConta, cpfNovoTitular);
}

function excluirCliente(): void {
    console.log("\nExcluir cliente:");
    let cpf: string = input('Digite o CPF do cliente: ');
    b.excluirCliente(cpf);
    console.log("Cliente excluído com sucesso!");
}

function exibirContasSemCliente(): void {
    const contasSemCliente = b.obterContasSemCliente();
    if (contasSemCliente.length == 0) {
        console.log("Nenhuma conta encontrada.");        
    } else {
        console.log("Contas sem cliente:");
        contasSemCliente.forEach((c: Conta) => console.log(`- Conta: ${c.numero}`));
    }

    let opcao: string = input("\nDeseja associar um cliente a uma dessas contas? (S/N): ");
    if (opcao.trim().toUpperCase() == "S") {
        associarContaCliente();
    }
}

function ordemBancaria(): void {
    const contaOrigem: string = input("Digite o número da conta de origem: ");
    const valorTransf: number = parseFloat(input("Digite o valor da transferência da ordem bancária: "));
    const contasDestino: string[] = input("Digite os números das contas de destino separados por VIRGULA: ").split(",");

    b.ordemBancaria(contaOrigem, contasDestino, valorTransf);
}