import { Poupanca } from "./poupanca";

class Conta {
    private _id: number;
    private _numero: string;
    private _saldo: number;
    private _cliente!: Cliente;
    public get id(): number {
        return this.id;
    }

    public set id(value: number) {
        this.id = value;
    }

    public get numero(): string {
        return this.numero;
    }

    public set numero(value: string) {
        this.numero = value;
    }

    public get saldo(): number {
        return this.saldo;
    }

    public get cliente(): Cliente {
        return this.cliente;
    }

    public set cliente(value: Cliente) {
        this.cliente = value;
    }

    constructor(numero: string, saldo: number) {
        this._id = 0;
        this._numero = numero;
        this._saldo = saldo;
        
    }


    sacar(valor: number): void {
        this._saldo = this.saldo - valor;
    }

    depositar(valor: number): void {
        this._saldo = this.saldo + valor;
    }

    consultarSaldo(): number {
        return this.saldo
    }

    transferir(contaDestino: Conta, valor: number): void {
        // this.saldo = this.saldo - valor;
        // contaDestino.saldo = contaDestino.saldo + valor;

        this.sacar(valor);
        contaDestino.depositar(valor);
    }
}

class Cliente {
    private _id!: number;
    private _nome: string;
    private _cpf: string;
    private _dataNascimento: Date;
    private _contas: Conta[];

    constructor(nome: string, cpf: string, dataNascimento: Date) {
        this._nome = nome;
        this._cpf = cpf;
        this._dataNascimento = dataNascimento;
        this._contas = [];
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get nome(): string {
        return this._nome;
    }

    get cpf(): string {
        return this._cpf;
    }

    get dataNascimento(): Date {
        return this._dataNascimento;
    }

    get contas(): Conta[] {
        return this._contas;
    }

    adicionarConta(conta: Conta): void {
        this._contas.push(conta);
    }

    removerConta(numConta: string): void {
        let indiceProcurado: number = -1;
        for (let i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numConta) {
                indiceProcurado = i;
                break;
            }
        }

        if (indiceProcurado != -1) {
            for (let i = indiceProcurado; i < this._contas.length - 1; i++) {
                this._contas[i] = this._contas[i + 1];
            }
            this._contas.pop();
        }
    }

    totalizarSaldo(): number {
        return this._contas.reduce((acc, conta) => acc + conta.consultarSaldo(), 0);
    }
}

class Banco {
    private contas: Conta[];
    private clientes: Cliente[];
    idClienteAtual: number;
    idContaAtual: number;

    constructor() {
        this.contas = [];
        this.clientes = [];
        this.idClienteAtual = 1;
        this.idContaAtual = 1;
    }

    public inserirConta(conta: Conta) {
        conta.id =(this.idContaAtual++);
        this.contas.push(conta);
    }

    public consultarConta(numero: string): Conta {
        let contaProcurada!: Conta;

        for (let conta of this.contas) {
            if (conta.numero == numero) {
                contaProcurada = conta;
                break;
            }
        }

        return contaProcurada;
    }

    private consultarContaPorIndice(numero: string): number {
        let indiceProcurado: number = -1;

        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }

        return indiceProcurado;
    }

    // Refatorado
    public excluirConta(numero: string): void {
        let indiceProcurado: number =
            this.consultarContaPorIndice(numero);
        
        if (indiceProcurado != -1) {
            this.contas[indiceProcurado].cliente.removerConta(numero); // Remove a conta entre as contas do cliente
            for (let i = indiceProcurado; i < this.contas.length - 1; i++) {
                this.contas[i] = this.contas[i + 1];
            }
            this.contas.pop();
        }
    }

    public alterar(conta: Conta): void {
        let contaProcurada: Conta = this.consultarConta(conta.numero);

        if (contaProcurada) {
            contaProcurada = conta;
        }
    }

    public inserirCliente(cliente: Cliente): void {
        cliente.id =(this.idClienteAtual++);
        this.clientes.push(cliente);
    }

    public consultarCliente(cpf: string): Cliente {
        let clienteProcurado!: Cliente;

        for (let cliente of this.clientes) {
            if (cliente.cpf == cpf) {
                clienteProcurado = cliente;
            }
        }
        return clienteProcurado;
    }

    public excluirCliente(cpfCliente: string): void {
        let clienteProcurado: Cliente = this.consultarCliente(cpfCliente);

        if (!clienteProcurado) {
            console.log("Cliente nao encontrado.");
            return;
        }

        for (let i = 0; i < this.clientes.length; i++) {
            if (this.clientes[i].cpf === cpfCliente) {
                // Remove o cliente da lista de clientes do banco
                for (let j = i; j < this.clientes.length - 1; j++) {
                    this.clientes[j] = this.clientes[j + 1];
                }
                this.clientes.pop();
                break;
            }
        }
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

        if (contaProcurada && clienteProcurado && !contaProcurada.cliente) {
            contaProcurada.cliente = (clienteProcurado);
            clienteProcurado.adicionarConta(contaProcurada);
        }
    }

    public jaExisteContaParaCliente(cliente: Cliente, conta: Conta): boolean {
        let jaExiste: boolean = false;

        const clienteConta: Cliente = conta.cliente;
        if (clienteConta != null) {
            if (clienteConta.cpf == cliente.cpf) {
                jaExiste = true;
            } else {

                for (let contaAssociada of cliente.contas) {
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
            contas = clienteProcurado.contas;
        }
        return contas;
    }

    public totalizarSaldoCliente(cpf: string): number {
        let clienteProcurado: Cliente = this.consultarCliente(cpf);
        if (clienteProcurado) {
            return clienteProcurado.totalizarSaldo();
        }

        return -1;
    }


    public obterQuantidadeDeContas(): number {
        return this.contas.length;
    }


    public obterTotalDinheiroDepositado(): number {
        let total: number = this.contas.reduce((acc, conta) => acc + conta.saldo, 0);
        return total ;
    }


    public calcularMediaSaldoContas(): number {
        return this.obterTotalDinheiroDepositado()/this.obterQuantidadeDeContas();
    }

    public mudarTitularidadeConta(numeroConta: string, cpfNovoTitular: string): void {
        let contaProcurada: Conta = this.consultarConta(numeroConta);
        let clienteProcurado: Cliente = this.consultarCliente(cpfNovoTitular);

        if (!contaProcurada || !clienteProcurado) {
            console.log("Conta ou cliente nao encontrados.");
            return;
        }
        
        if (this.jaExisteContaParaCliente(clienteProcurado, contaProcurada)) {
            console.log("Conta ja associada a esse mesmo cliente.");
            return;
        }
        
        // Remove essa conta da lista de conta do cliente antigo
        const numeroProc: string = contaProcurada.numero;
        const clienteContaProc: Cliente = contaProcurada.cliente;
        for (let conta of contaProcurada.cliente.contas) {
            if (conta.numero == numeroProc) {
                // Percorre a lista de contas do cliente antigo e remove a selecionada
                clienteContaProc.removerConta(numeroProc);

            }
        }

        // Adiciona a conta ao outro cliente
        contaProcurada.cliente = (clienteProcurado);
        clienteProcurado.adicionarConta(contaProcurada);
    }

    public obterContasSemCliente(): Conta[] {
        return this.contas.filter(conta => !conta.cliente);
    }

    public ordemBancaria(contaOrigem: string, contasDestino: string[], valorTransf: number): void {
        let contaOrigemProcurada: Conta = this.consultarConta(contaOrigem);
        if (!contaOrigemProcurada) {
            console.log("Conta de origem nao encontrada");
            return;
        }
        
        // Verifica se todas as contas de destino existem
        for (let contaDestino of contasDestino) {
            if (!this.consultarConta(contaDestino)) {
                console.log("Uma das contas de destino nao foi encontrada...");
                console.log("Cancelando ordem bancária...");
                return;
            }
        }

        // Verifica se a conta de origem possui saldo suficiente para realizar a transferência para todas as contas
        if (contaOrigemProcurada.saldo < valorTransf*contasDestino.length) {
            console.log(`A conta ${contaOrigemProcurada.numero} possui saldo insuficiente para realizar a ordem bancária...`);
            return;
        }

        for (let contaDestino of contasDestino) {
            this.transferir(contaOrigem, contaDestino, valorTransf);
        }

        console.log("Ordem bancária realizada com sucesso!");
    }

    public renderJuros(numConta: string){
        let contaProcurada: Conta = this.consultarConta(numConta);

        if (contaProcurada && contaProcurada instanceof Poupanca) {
            (<Poupanca> contaProcurada).renderJuros();
            console.log(`Juros renderizados na conta ${contaProcurada.numero}`);
            
        }
    }
}

export { Banco, Poupanca, Conta, Cliente };