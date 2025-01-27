import prompt from "prompt-sync";
import { Conta, ContaImposto, Poupanca, Cliente, Banco } from "./banco";
import * as fs from 'fs';

class App {
    private _caminhoArquivo: string;
    private _input: prompt.Prompt;
    private _banco: Banco;

    constructor() {
        this._banco = new Banco();
        this._input = prompt();
        this._caminhoArquivo = './contas.txt'
        this.carregarDeArquivo();
    }

    public carregarDeArquivo() {
        const arquivo: string = fs.readFileSync(this._caminhoArquivo, 'utf-8');
        //no windows, você considerar dois caracteres
        const linhas: string[] = arquivo.split('\r\n');
        //no linux, use apenas o \n
        //const linhas: string[] = arquivo.split('\n');
        //console.log(linhas);
        console.log("Iniciando leitura de arquivo");

        for (let i: number = 0; i < linhas.length; i++) {
            let linhaConta: string[] = linhas[i].split(";");
            let conta!: Conta;
            let cliente!: Cliente;

            let tipo: string = linhaConta[0];

            if (tipo == 'C') {
                conta = new Conta(parseInt(linhaConta[1]), linhaConta[2], parseFloat(linhaConta[3]));
                cliente = new Cliente(parseInt(linhaConta[4]), linhaConta[5], linhaConta[6], this.stringParaData(linhaConta[7]));
            } else if (tipo == 'CP') {
                conta = new Poupanca(parseInt(linhaConta[1]), linhaConta[2], parseFloat(linhaConta[3]), parseFloat(linhaConta[4]));
                cliente = new Cliente(parseInt(linhaConta[5]), linhaConta[6], linhaConta[7], this.stringParaData(linhaConta[8]));
            } else if (tipo == 'CI') {
                conta = new ContaImposto(parseInt(linhaConta[1]), linhaConta[2], parseFloat(linhaConta[3]), parseFloat(linhaConta[4]));
                cliente = new Cliente(parseInt(linhaConta[5]), linhaConta[6], linhaConta[7], this.stringParaData((linhaConta[8])));
            }

            this._banco.inserirConta(conta);
            this._banco.inserirCliente(cliente);
            //nesse caso, o método abaixo não é o melhor em termos de performance.
            this._banco.associarContaCliente(conta.numero, cliente.cpf);
            console.log(`Conta ${conta.numero} carregada`);
        }

        console.log("fim do arquivo")

    }

    public salvarEmArquivo() {
        console.log("Iniciando a gravação de contas em arquivo.")
        let stringContas: string = "";
        let linha: string = "";

        for (let conta of this._banco.contas) {


            let dataString = this.dataParaString(conta.cliente.dataNascimento);

            if (conta instanceof Poupanca) {
                linha = `CP;${conta.id};${conta.numero};${conta.saldo};${conta.taxaDeJuros};${conta.cliente.id};${conta.cliente.nome};${conta.cliente.cpf};${dataString}\r\n`;
            }
            else if ((conta instanceof ContaImposto)) {
                linha = `CI;${conta.id};${conta.numero};${conta.saldo};${conta.taxaDeImposto};${conta.cliente.id};${conta.cliente.nome};${conta.cliente.cpf};${dataString}\r\n`;
            } else {
                linha = `C;${conta.id};${conta.numero};${conta.saldo};${conta.cliente.id};${conta.cliente.nome};${conta.cliente.cpf};${dataString}\r\n`;
            }


            stringContas += linha;
        }
        //deleta os últimos \r\n da string que vai pro arquivo, evitando que grave uma linha vazia
        stringContas = stringContas.slice(0, stringContas.length - 2);

        fs.writeFileSync(this._caminhoArquivo, stringContas, 'utf-8');
        console.log("Contas salvas em arquivo.")
    }

    private stringParaData(dataString: string): Date {
        const [dia, mes, ano] = dataString.split('/').map(Number);
        return new Date(ano, mes - 1, dia);
    }

    private dataParaString(data: Date): string {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }

    public menu(): void {
        let opcao: string = '';

        do {
            try {
                console.log('\nBem-vindo! Escolha uma opção:');
                console.log('Contas:');
                console.log('1 - Inserir        2 - Consultar  3 - Sacar');
                console.log('4 - Depositar      5 - Excluir  6 - Transferir');
                console.log('7 - Totalizações   8 - Render juros');
                console.log('Clientes:');
                console.log('20 - Inserir    21 - Consultar   22 - Associar');
                console.log('23 - Total aplicado por cliente');
                console.log('0 - Sair');
                opcao = this._input("Opção: ");

                switch (opcao.toLowerCase()) {
                    case "1":
                        this.inserirConta();
                        break;
                    case "2":
                        this.consultarConta();
                        break;
                    case "3":
                        this.sacar();
                        break;
                    case "4":
                        this.depositar();
                        break;
                    case "5":
                        this.excluirConta();
                        break;
                    case "6":
                        this.transferir();
                        break;
                    case "7":
                        this.totalizacoes();
                        break;
                    case "8":
                        this.renderJuros();
                        break;
                    case "20":
                        this.inserirCliente();
                        break;
                    case "21":
                        this.consultarCliente();
                        break;
                    case "22":
                        this.associarContaCliente();
                        break;
                    case "23":
                        this.totalizarSaldoCliente();
                        break;
                    case "0":
                        console.log("Saindo...");
                        break;
                    default:
                        console.log("Opção inválida!");
                }
                this._input("Operação finalizada. Pressione <Enter> para continuar.");

            } catch (e: any) {
                console.log(e.message);
            }
        } while (opcao != "0");

        console.log("Aplicação encerrada.");
        this.salvarEmArquivo();
    }
    renderJuros() {
        console.log("\Render juros:");
        let numero: string = this._input('Digite o número da poupança: ');
        this._banco.renderJuros(numero);
        this.exibirExtrato(numero);
    }

    private inserirConta(): void {
        console.log("\nCadastrar conta:");
        let id: number = parseInt(this._input('Digite o id da conta: '));
        let numero: string = this._input('Digite o número da conta: ');
        let saldo: number = parseFloat(this._input('Digite o saldo inicial da conta: '));
        this.validaValor(saldo);
        let tipoConta: string = this._input('Digite o tipo da conta (1 - Conta, 2 - Poupança, 3 - Conta Imposto): ');

        let conta: Conta;

        if (tipoConta === '2') {
            let taxaJuros: number = parseFloat(this._input('Digite a taxa de juros da poupança: '));
            conta = new Poupanca(id, numero, saldo, taxaJuros);
        } else if (tipoConta === '3') {
            let taxaImposto: number = parseFloat(this._input('Digite o a taxa do imposto: '));
            conta = new ContaImposto(id, numero, saldo, taxaImposto);
        } else {
            conta = new Conta(id, numero, saldo);
        }

        this._banco.inserirConta(conta);
        console.log("Conta cadastrada com sucesso!");
    }

    private sacar(): void {
        console.log("\nSaque:");
        let numero: string = this._input('Digite o número da conta: ');
        let valor: number = parseFloat(this._input('Digite o valor do saque: '));
        this.validaValor(valor);
        this._banco.sacar(numero, valor);
        console.log("Saque realizado.");
        this.exibirExtrato(numero);
    }

    private depositar(): void {
        console.log("\nDepósito:");
        let numero: string = this._input('Digite o número da conta: ');
        let valor: number = parseFloat(this._input('Digite o valor do depósito: '));
        this.validaValor(valor);
        this._banco.depositar(numero, valor);
        console.log("Depósito realizado.");
        this.exibirExtrato(numero);
    }

    private transferir(): void {
        console.log("\nTransferência:");
        let numeroOrigem: string = this._input('Digite o número da conta de origem: ');
        let numeroDestino: string = this._input('Digite o número da conta de destino: ');
        let valor: number = parseFloat(this._input('Digite o valor da transferência: '));
        this.validaValor(valor);
        this._banco.transferir(numeroOrigem, numeroDestino, valor);
        console.log("Transferência realizada.");
        console.log("\nExtrato da conta de origem:");
        this.exibirExtrato(numeroOrigem);
        console.log("\nExtrato da conta de destino:");
        this.exibirExtrato(numeroDestino);
    }

    private consultarConta(): void {
        console.log("\nConsultar conta:");
        let numero: string = this._input('Digite o número da conta: ');
        this.exibirExtrato(numero);
    }

    private exibirExtrato(numero: string): void {
        const conta = this._banco.consultarConta(numero);
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
                console.log(`CPF: ${this.dataParaString(cliente.dataNascimento)}`);
            } else {
                console.log("Cliente: Não associado.");
            }
            console.log("=========================\n");
        } else {
            console.log("Conta não encontrada para exibir extrato.");
        }
    }

    private excluirConta(): void {
        console.log("\nExcluir conta:");
        let numero: string = this._input('Digite o número da conta: ');
        this._banco.excluir(numero);
        console.log("Conta excluída com sucesso!");
    }

    private totalizacoes(): void {
        console.log("\nTotalizações:");
        console.log(`Quantidade de contas: ${this._banco.obterQuantidadeDeContas()}`);
        console.log(`Total depositado no banco: ${this._banco.obterTotalDinheiroDepositado()}`);
        console.log(`Média de saldo das contas: ${this._banco.calcularMediaSaldoContas()}`);
    }

    private inserirCliente(): void {
        console.log("\nCadastrar cliente:");
        let id: number = parseInt(this._input('Digite o id do cliente: '));
        let nome: string = this._input('Digite o nome do cliente: ');
        let cpf: string = this._input('Digite o CPF do cliente: ');
        let dataNascimento: Date = new Date(this._input('Digite a data de nascimento (dd/mm/aaaa): '));
        let cliente: Cliente = new Cliente(id, nome, cpf, dataNascimento);
        this._banco.inserirCliente(cliente);
        console.log("Cliente cadastrado com sucesso!");
    }

    private consultarCliente(): void {
        console.log("\nConsultar cliente:");
        let cpf: string = this._input('Digite o CPF do cliente: ');
        let cliente = this._banco.consultarCliente(cpf);
        if (cliente) {
            console.log(`Cliente encontrado: ID ${cliente.id}, Nome: ${cliente.nome}, CPF: ${cliente.cpf}, Data de nascimento: ${this.dataParaString(cliente.dataNascimento)}`);
        } else {
            console.log("Cliente não encontrado.");
        }
    }

    private associarContaCliente(): void {
        console.log("\nAssociar conta a cliente:");
        let numeroConta: string = this._input('Digite o número da conta: ');
        let cpfCliente: string = this._input('Digite o CPF do cliente: ');
        this._banco.associarContaCliente(numeroConta, cpfCliente);
        console.log("Conta associada ao cliente com sucesso!");
    }

    private totalizarSaldoCliente(): void {
        console.log("\nTotalizar saldo por cliente:");
        let cpfCliente: string = this._input('Digite o CPF do cliente: ');
        let total = this._banco.totalizarSaldoCliente(cpfCliente);
        console.log("Total: " + total);
    }

    /**5) Crie  um  método  chamado  validaValor(valor)  na  que  lance  um  erro  caso  o  valor 
    repassado seja menor ou igual a zero ou em formato inválido */
    private validaValor(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor deve ser maior que zero.");
        }
    }
}

// Instância da aplicação e inicialização
let app: App = new App();
app.menu();
