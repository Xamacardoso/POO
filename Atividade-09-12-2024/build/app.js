"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const banco_1 = require("./banco");
class AppBancario {
    constructor() {
        this.banco = new banco_1.Banco();
    }
}
let input = (0, prompt_sync_1.default)();
let b = new banco_1.Banco();
let opcao = '';
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
function exibirMenu() {
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
function inserirConta() {
    console.log("\nCadastrar conta:");
    let numero = input('Digite o número da conta: ');
    let saldo = parseFloat(input('Digite o saldo inicial da conta: '));
    let conta = new banco_1.Conta(numero, saldo); // Cliente será associado posteriormente
    b.inserirConta(conta);
    console.log("Conta cadastrada com sucesso!");
}
function sacar() {
    console.log("\nSaque:");
    let numero = input('Digite o número da conta: ');
    let valor = parseFloat(input('Digite o valor do saque: '));
    b.sacar(numero, valor);
    console.log("Saque realizado.");
    exibirExtrato(numero);
}
function depositar() {
    console.log("\nDepósito:");
    let numero = input('Digite o número da conta: ');
    let valor = parseFloat(input('Digite o valor do depósito: '));
    b.depositar(numero, valor);
    console.log("Depósito realizado.");
    exibirExtrato(numero);
}
function transferir() {
    console.log("\nTransferência:");
    let numeroOrigem = input('Digite o número da conta de origem: ');
    let numeroDestino = input('Digite o número da conta de destino: ');
    let valor = parseFloat(input('Digite o valor da transferência: '));
    b.transferir(numeroOrigem, numeroDestino, valor);
    console.log("Transferência realizada.");
    console.log("\nExtrato da conta de origem:");
    exibirExtrato(numeroOrigem);
    console.log("\nExtrato da conta de destino:");
    exibirExtrato(numeroDestino);
}
function consultarConta() {
    console.log("\nConsultar conta:");
    let numero = input('Digite o número da conta: ');
    exibirExtrato(numero);
}
function exibirExtrato(numero) {
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
        }
        else {
            console.log("Cliente: Não associado.");
        }
        console.log("=========================\n");
    }
    else {
        console.log("Conta não encontrada para exibir extrato.");
    }
}
function excluirConta() {
    console.log("\nExcluir conta:");
    let numero = input('Digite o número da conta: ');
    b.excluirConta(numero);
    console.log("Conta excluída com sucesso!");
}
function totalizacoes() {
    console.log("\nTotalizações:");
    console.log(`Quantidade de contas: ${b.obterQuantidadeDeContas()}`);
    console.log(`Total depositado no banco: ${b.obterTotalDinheiroDepositado()}`);
    console.log(`Média de saldo das contas: ${b.calcularMediaSaldoContas()}`);
}
function inserirCliente() {
    console.log("\nCadastrar cliente:");
    let nome = input('Digite o nome do cliente: ');
    let cpf = input('Digite o CPF do cliente: ');
    let dataNascimento = new Date(input('Digite a data de nascimento (AAAA-MM-DD): '));
    let cliente = new banco_1.Cliente(nome, cpf, dataNascimento);
    b.inserirCliente(cliente);
    console.log("Cliente cadastrado com sucesso!");
}
function consultarCliente() {
    console.log("\nConsultar cliente:");
    let cpf = input('Digite o CPF do cliente: ');
    let cliente = b.consultarCliente(cpf);
    if (cliente) {
        console.log(`Cliente encontrado: ID ${cliente.id}, Nome: ${cliente.nome}, CPF: ${cliente.cpf}`);
    }
    else {
        console.log("Cliente não encontrado.");
    }
}
function associarContaCliente() {
    console.log("\nAssociar conta a cliente:");
    let numeroConta = input('Digite o número da conta: ');
    let cpfCliente = input('Digite o CPF do cliente: ');
    b.associarContaCliente(numeroConta, cpfCliente);
    console.log("Conta associada ao cliente com sucesso!");
}
function totalizarSaldoCliente() {
    console.log("\Totalizar saldo por cliente:");
    let cpfCliente = input('Digite o CPF do cliente: ');
    let total = b.totalizarSaldoCliente(cpfCliente);
    console.log("Total: " + total);
}
function mudarTitularidadeConta() {
    console.log("\nMudar titularidade da conta:");
    let numeroConta = input('Digite o número da conta: ');
    let cpfNovoTitular = input('Digite o CPF do novo titular: ');
    b.mudarTitularidadeConta(numeroConta, cpfNovoTitular);
}
function excluirCliente() {
    console.log("\nExcluir cliente:");
    let cpf = input('Digite o CPF do cliente: ');
    b.excluirCliente(cpf);
    console.log("Cliente excluído com sucesso!");
}
function exibirContasSemCliente() {
    const contasSemCliente = b.obterContasSemCliente();
    if (contasSemCliente.length == 0) {
        console.log("Nenhuma conta encontrada.");
    }
    else {
        console.log("Contas sem cliente:");
        contasSemCliente.forEach((c) => console.log(`- Conta: ${c.numero}`));
    }
    let opcao = input("\nDeseja associar um cliente a uma dessas contas? (S/N): ");
    if (opcao.trim().toUpperCase() == "S") {
        associarContaCliente();
    }
}
function ordemBancaria() {
    const contaOrigem = input("Digite o número da conta de origem: ");
    const valorTransf = parseFloat(input("Digite o valor da transferência da ordem bancária: "));
    const contasDestino = input("Digite os números das contas de destino separados por VIRGULA: ").split(",");
    b.ordemBancaria(contaOrigem, contasDestino, valorTransf);
}
