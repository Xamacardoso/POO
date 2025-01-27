
class Conta {
    private _id: number;
    private _numero: string;
    private _saldo: number;
    private _cliente!: Cliente;

    constructor(id: number, numero: string, saldo: number) {
        this._id = id;
        this._numero = numero;
        this._saldo = saldo;
    }

    public sacar(valor: number): void {
        if (this._saldo < valor) {
            throw new Error('Saldo insuficiente:' + this._saldo);
        }

        this._saldo = this._saldo - valor;
    }

    public depositar(valor: number): void {
        this._saldo = this._saldo + valor;
    }

    public transferir(contaDestino: Conta, valor: number): void {
        // this.saldo = this.saldo - valor;
        // contaDestino.saldo = contaDestino.saldo + valor;

        this.sacar(valor);
        contaDestino.depositar(valor);
    }

    public get id(): number {
        return this._id
    }

    public get numero(): string {
        return this._numero
    }

    public get saldo(): number {
        return this._saldo;
    }

    public get cliente(): Cliente {
        return this._cliente
    }

    public set cliente(cliente: Cliente) {
        this._cliente = cliente;
    }

}

class Poupanca extends Conta {
    private _taxaDeJuros: number;

    constructor(id: number, numero: string, saldo: number, taxaDeJuros: number) {
        super(id, numero, saldo);
        this._taxaDeJuros = taxaDeJuros;
    }

    public renderJuros() {
        let juros: number = this.saldo * this._taxaDeJuros;
        this.depositar(juros);
    }

    get taxaDeJuros(): number {
        return this._taxaDeJuros;
    }
}

class ContaImposto extends Conta {
    private _taxaDeImposto: number

    constructor(id: number, numero: string, saldo: number, taxaDeImposto: number) {
        super(id, numero, saldo);
        this._taxaDeImposto = taxaDeImposto;
    }

    public sacar(valor: number): void {
        let imposto: number = valor * this._taxaDeImposto;
        let totalSaque: number = valor + imposto;
        super.sacar(totalSaque);
    }

    get taxaDeImposto(): number {
        return this._taxaDeImposto;
    }
}


class Cliente {
    private _id: number;
    private _nome: string;
    private _cpf: string;
    private _dataNascimento: Date;
    private _contas: Conta[];

    constructor(id: number, nome: string, cpf: string, dataNascimento: Date) {
        this._id = id;
        this._nome = nome;
        this._cpf = cpf;
        this._dataNascimento = dataNascimento;
        this._contas = [];
    }

    public get id(): number {
        return this._id
    }

    public get nome(): string {
        return this._nome;
    }

    public get cpf(): string {
        return this._cpf;
    }

    public adicionarConta(contaProcurada: Conta) {
        this._contas.push(contaProcurada);
    }

    public listarCopiaContas(): Conta[] {
        let copiaContas: Conta[] = []
        for (let conta of this._contas) {
            let contaCopiada = new Conta(conta.id, conta.numero, conta.saldo);
            contaCopiada.cliente = conta.cliente;
            copiaContas.push(contaCopiada)
        }

        return copiaContas;
    }

    get dataNascimento() {
        return this._dataNascimento;
    }
}

/*
let c1: Cliente = new Cliente('ely', '825', new Date);
c1.id = 1;
c1.adicionarConta(new Conta('111-1', 100));

let contas1 = c1.listarCopiaContas();
contas1[0].sacar(100);
console.log(contas1[0].saldo);

let contas2 = c1.listarCopiaContas();
console.log(contas2[0].saldo);

*/

class Banco {
    private _contas: Conta[];
    private _clientes: Cliente[];

    constructor() {
        this._contas = [];
        this._clientes = [];
    }

    get contas(): Conta[] {
        return this._contas;
    } 

    public inserirConta(conta: Conta) {
        this._contas.push(conta);
    }

    public consultarConta(numero: string): Conta {
        let contaProcurada!: Conta;

        for (let conta of this._contas) {
            if (conta.numero == numero) {
                contaProcurada = conta;
                break;
            }
        }

        return contaProcurada;
    }

    private consultarContaPorIndice(numero: string): number {
        let indiceProcurado: number = -1;

        for (let i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }

        return indiceProcurado;
    }

    public excluir(numero: string): void {
        let indiceProcurado: number =
            this.consultarContaPorIndice(numero);

        if (indiceProcurado != -1) {
            for (let i = indiceProcurado; i < this._contas.length - 1; i++) {
                this._contas[i] = this._contas[i + 1];
            }
            this._contas.pop();
        }
    }

    public alterar(conta: Conta): void {
        let contaProcurada: Conta = this.consultarConta(conta.numero);

        if (contaProcurada) {
            contaProcurada = conta;
        }
    }

    public inserirCliente(cliente: Cliente): void {
        this._clientes.push(cliente);
    }

    public consultarCliente(cpf: string): Cliente {
        let clienteProcurado!: Cliente;

        for (let cliente of this._clientes) {
            if (cliente.cpf == cpf) {
                clienteProcurado = cliente;
            }
        }
        return clienteProcurado;
    }

    public sacar(numero: string, valor: number): void {
        let contaProcurada: Conta = this.consultarConta(numero);

        if (contaProcurada) {
            contaProcurada.sacar(valor);
        }
    }

    public depositar(numero: string, valor: number): void {
        let contaProcurada: Conta = this.consultarConta(numero);

        if (contaProcurada) {
            contaProcurada.depositar(valor);
        }
    }

    public transferir(numeroOrigem: string, numeroDestino: string, valor: number): void {
        let contaOrigem: Conta = this.consultarConta(numeroOrigem);
        let contaDestino: Conta = this.consultarConta(numeroDestino);

        if (contaOrigem && contaDestino) {
            contaOrigem.transferir(contaDestino, valor);
        }
    }


    public associarContaCliente(numeroConta: string, cpfCliente: string): void {
        let contaProcurada: Conta = this.consultarConta(numeroConta);
        let clienteProcurado: Cliente = this.consultarCliente(cpfCliente);

        if (contaProcurada && clienteProcurado) {
            contaProcurada.cliente = clienteProcurado;
            clienteProcurado.adicionarConta(contaProcurada);
        }
    }

    public jaExisteContaParaCliente(cliente: Cliente, conta: Conta): boolean {
        let jaExiste: boolean = false;

        if (conta.cliente != null) {
            if (conta.cliente.cpf == cliente.cpf) {
                jaExiste = true;
            } else {
                for (let contaAssociada of cliente.listarCopiaContas()) {
                    if (contaAssociada.numero == conta.numero) {
                        jaExiste = true;
                    }
                }
            }
        }

        return jaExiste;
    }

    public listarContasCliente(cpf: string): Conta[] {
        let clienteProcurado: Cliente = this.consultarCliente(cpf);
        let contas: Conta[] = [];

        if (clienteProcurado) {
            contas = clienteProcurado.listarCopiaContas();
        }
        return contas;
    }

    public renderJuros(numero: string) {
        let contaProcurada: Conta = this.consultarConta(numero);
        if (contaProcurada instanceof Poupanca) {
            //(contaProcurada as Poupanca).renderJuros(); em java é obrigatório o "cast"
            contaProcurada.renderJuros(); //em typescript já é feito o cast
        }
    }

    public totalizarSaldoCliente(cpf: string): number {
        let clienteProcurado: Cliente = this.consultarCliente(cpf);
        let total: number = 0;
        if (clienteProcurado) {
            for (let conta of clienteProcurado.listarCopiaContas()) {
                total += conta.saldo;
            }
        }

        return total;
    }

    public obterQuantidadeDeContas(): number {
        return this._contas.length;
    }


    public obterTotalDinheiroDepositado(): number {
        let total: number = 0;

        for (let conta of this._contas) {
            total = total + conta.saldo;
        }
        return total;
    }

    public calcularMediaSaldoContas(): number {
        return this.obterTotalDinheiroDepositado() / this.obterQuantidadeDeContas();
    }

}


export { Conta, ContaImposto, Poupanca, Cliente, Banco }