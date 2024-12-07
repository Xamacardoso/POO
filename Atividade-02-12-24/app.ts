import {Banco, Cliente, Conta} from './banco';

const input = require('prompt-sync')();
let banco: Banco = new Banco();
let opcao: string | null = ''; 
 
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
function inserir(): void { 
    console.log("\nCadastrar conta\n"); 
    let numero: string = input('Digite o número da conta: '); 
 
    banco.inserirConta(numero);
}

// Consulta uma conta no banco
function consultar(): void{
    console.log("Consultando conta\n");

    let numero: string = input("Digite o número da conta: ");
    console.log(banco.consultarConta(numero) ? banco.consultarConta(numero) : "Conta nao encontrada!");
}

// Realiza o saque de uma conta no banco
function sacar(): void{
    console.log("Sacando dinheiro de uma conta\n");

    let numero: string = input("Digite o número da conta: ");
    let valor: number = parseFloat(input("Digite o valor a ser sacado: "));
    banco.sacar(numero, valor);
}

// Deposita dinheiro em uma determinada conta
function depositar(): void{
    console.log("Depositando dinheiro em uma conta\n");

    let numero: string = input("Digite o número da conta: ");
    let valor : number = parseFloat(input("Digite o valor a ser depositado: "));
    banco.depositar(numero, valor);
}

// Exclui uma conta do banco pelo seu numero
function excluirConta(): void{
    console.log("Excluindo uma conta\n");

    let numero: string = input("Digite o número da conta: ");
    banco.excluirConta(numero);
    
}
// Transfere dinheiro de uma conta para outra, passando os numeros das contas e o valor como argumentos
function transferir(): void{
    console.log("Transferência de dinheiro\n");

    let numeroOrigem: string = input("Digite o número da conta de origem: ");
    let numeroDestino: string = input("Digite o número da conta de destino: ");
    let valor: number = parseFloat(input("Digite o valor a ser transferido: "));
    banco.transferir(numeroOrigem, numeroDestino, valor);
}

// Totaliza o dinheiro de todas as contas do banco
function totalizar(): void{
    console.log("Totalizando dinheiro\n");
    console.log("O somatório de todas as contas do banco é de R$" + banco.somatorioContas().toFixed(2));
}

// Insere um novo cliente no banco
function inserirCliente(): void{

    let cpf: string = input("Digite o CPF do cliente: ");
    let nome: string = input("Digite o nome do cliente: ");
    let data: Date = new Date();

    let novoCliente: Cliente = new Cliente(nome,cpf,data);
    banco.inserirCliente(novoCliente);
}

// Consulta um cliente cadastrado no banco
function consultarCliente(): void{

    let cpf: string = input("Digite o CPF do cliente: ");
    console.log(banco.consultarCliente(cpf) ? banco.consultarCliente(cpf) : "Cliente nao encontrado!");
}

// Associa uma conta a um cliente
function associarContaCliente(): void{
    let numeroConta: string = input("Digite o número da conta: ");
    let cpfCliente: string = input("Digite o CPF do cliente: ");
    banco.associarContaCliente(numeroConta, cpfCliente);
}   