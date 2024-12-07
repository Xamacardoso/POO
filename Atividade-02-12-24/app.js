"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var banco_1 = require("./banco");
var input = require('prompt-sync')();
var banco = new banco_1.Banco();
var opcao = '';
do {
    console.log('\nBem vindo\nDigite uma opção:');
    console.log('Contas:\n' +
        '1 - Inserir       2 - Consultar    3 - Sacar\n' +
        '4 - Depositar     5 - Excluir      6 - Transferir\n' +
        '7 – Totalizações\n\n' +
        'Clientes:\n' +
        '8 - Inserir       9 - Consultar    10 - Associar\n' +
        '0 - Sair\n');
    opcao = input("Opção: ");
    console.clear();
    switch (opcao) {
        case "1":
            inserir();
            break;
        case "2":
            consultar();
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
            totalizar();
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
        //... 
    }
    input("Operação finalizada. Digite <enter>");
    console.clear();
} while (opcao != "0");
console.log("Aplicação encerrada");
// Insere uma nova conta no banco
function inserir() {
    console.log("\nCadastrar conta\n");
    var numero = input('Digite o número da conta: ');
    banco.inserirConta(numero);
}
// Consulta uma conta no banco
function consultar() {
    console.log("Consultando conta\n");
    var numero = input("Digite o número da conta: ");
    console.log(banco.consultarConta(numero) ? banco.consultarConta(numero) : "Conta nao encontrada!");
}
// Realiza o saque de uma conta no banco
function sacar() {
    console.log("Sacando dinheiro de uma conta\n");
    var numero = input("Digite o número da conta: ");
    var valor = parseFloat(input("Digite o valor a ser sacado: "));
    banco.sacar(numero, valor);
}
// Deposita dinheiro em uma determinada conta
function depositar() {
    console.log("Depositando dinheiro em uma conta\n");
    var numero = input("Digite o número da conta: ");
    var valor = parseFloat(input("Digite o valor a ser depositado: "));
    banco.depositar(numero, valor);
}
// Exclui uma conta do banco pelo seu numero
function excluirConta() {
    console.log("Excluindo uma conta\n");
    var numero = input("Digite o número da conta: ");
    banco.excluirConta(numero);
}
// Transfere dinheiro de uma conta para outra, passando os numeros das contas e o valor como argumentos
function transferir() {
    console.log("Transferência de dinheiro\n");
    var numeroOrigem = input("Digite o número da conta de origem: ");
    var numeroDestino = input("Digite o número da conta de destino: ");
    var valor = parseFloat(input("Digite o valor a ser transferido: "));
    banco.transferir(numeroOrigem, numeroDestino, valor);
}
// Totaliza o dinheiro de todas as contas do banco
function totalizar() {
    console.log("Totalizando dinheiro\n");
    console.log("O somatório de todas as contas do banco é de R$" + banco.somatorioContas().toFixed(2));
}
// Insere um novo cliente no banco
function inserirCliente() {
    var cpf = input("Digite o CPF do cliente: ");
    var nome = input("Digite o nome do cliente: ");
    var data = new Date();
    var novoCliente = new banco_1.Cliente(nome, cpf, data);
    banco.inserirCliente(novoCliente);
}
// Consulta um cliente cadastrado no banco
function consultarCliente() {
    var cpf = input("Digite o CPF do cliente: ");
    console.log(banco.consultarCliente(cpf) ? banco.consultarCliente(cpf) : "Cliente nao encontrado!");
}
// Associa uma conta a um cliente
function associarContaCliente() {
    var numeroConta = input("Digite o número da conta: ");
    var cpfCliente = input("Digite o CPF do cliente: ");
    banco.associarContaCliente(numeroConta, cpfCliente);
}
