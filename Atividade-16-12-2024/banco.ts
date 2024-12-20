
class Conta {
    private id: number;
    private numero: string;
    private saldo: number;
    private cliente!: Cliente;
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getNumero(): string {
        return this.numero;
    }

    public setNumero(numero: string): void {
        this.numero = numero;
    }

    public getSaldo(): number {
        return this.saldo;
    }

    public getCliente(): Cliente {
        return this.cliente;
    }

    public setCliente(cliente: Cliente): void {
        this.cliente = cliente;
    }

    constructor(numero: string, saldo: number) {
        this.id = 0;
        this.numero = numero;
        this.saldo = saldo;
        
    }

    sacar(valor: number): void {
        this.saldo = this.saldo - valor;
    }

    depositar(valor: number): void {
        this.saldo = this.saldo + valor;
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
    private id: number;
    private nome: string;
    private cpf: string;
    private dataNascimento: Date;
    private contas: Conta[];

    getId(): number {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getNome(): string {
        return this.nome;
    }

    getCpf(): string {
        return this.cpf;
    }

    getDataNascimento(): Date {
        return this.dataNascimento;
    }

    getContas(): Conta[] {
        return this.contas;
    }


    constructor(nome: string, cpf: string, dataNascimento: Date) {
        this.id = 0;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.contas = [];
    }

    adicionarConta(conta: Conta): void {
        this.contas.push(conta);
    }

    removerConta(numConta: string): void {  
        let indiceProcurado: number = -1;
        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].getNumero() == numConta) {
                indiceProcurado = i;
                break;
            }
        }

        if (indiceProcurado != -1) {
            for (let i = indiceProcurado; i < this.contas.length - 1; i++) {
                this.contas[i] = this.contas[i + 1];
            }
            this.contas.pop();
        }
    }

    totalizarSaldo(): number {
        return this.contas.reduce((acc, conta) => acc + conta.consultarSaldo(), 0);
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
        conta.setId(this.idContaAtual++);
        this.contas.push(conta);
    }

    public consultarConta(numero: string): Conta {
        let contaProcurada!: Conta;

        for (let conta of this.contas) {
            if (conta.getNumero() == numero) {
                contaProcurada = conta;
                break;
            }
        }

        return contaProcurada;
    }

    private consultarContaPorIndice(numero: string): number {
        let indiceProcurado: number = -1;

        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].getNumero() == numero) {
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
            this.contas[indiceProcurado].getCliente().removerConta(numero); // Remove a conta entre as contas do cliente
            for (let i = indiceProcurado; i < this.contas.length - 1; i++) {
                this.contas[i] = this.contas[i + 1];
            }
            this.contas.pop();
        }
    }

    public alterar(conta: Conta): void {
        let contaProcurada: Conta = this.consultarConta(conta.getNumero());

        if (contaProcurada) {
            contaProcurada = conta;
        }
    }

    public inserirCliente(cliente: Cliente): void {
        cliente.setId(this.idClienteAtual++);
        this.clientes.push(cliente);
    }

    public consultarCliente(cpf: string): Cliente {
        let clienteProcurado!: Cliente;

        for (let cliente of this.clientes) {
            if (cliente.getCpf() == cpf) {
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
            if (this.clientes[i].getCpf() === cpfCliente) {
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

        if (contaProcurada && clienteProcurado && !contaProcurada.getCliente()) {
            contaProcurada.setCliente(clienteProcurado);
            clienteProcurado.adicionarConta(contaProcurada);
        }
    }

    public jaExisteContaParaCliente(cliente: Cliente, conta: Conta): boolean {
        let jaExiste: boolean = false;

        const clienteConta: Cliente = conta.getCliente();
        if (clienteConta != null) {
            if (clienteConta.getCpf() == cliente.getCpf()) {
                jaExiste = true;
            } else {

                for (let contaAssociada of cliente.getContas()) {
                    if (contaAssociada.getNumero() == conta.getNumero()) {
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
            contas = clienteProcurado.getContas();
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
        let total: number = this.contas.reduce((acc, conta) => acc + conta.getSaldo(), 0);
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
        const numeroProc: string = contaProcurada.getNumero();
        const clienteContaProc: Cliente = contaProcurada.getCliente();
        for (let conta of contaProcurada.getCliente().getContas()) {
            if (conta.getNumero() == numeroProc) {
                // Percorre a lista de contas do cliente antigo e remove a selecionada
                clienteContaProc.removerConta(numeroProc);

            }
        }

        // Adiciona a conta ao outro cliente
        contaProcurada.setCliente(clienteProcurado);
        clienteProcurado.adicionarConta(contaProcurada);
    }

    public obterContasSemCliente(): Conta[] {
        return this.contas.filter(conta => !conta.getCliente());
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
        if (contaOrigemProcurada.getSaldo() < valorTransf*contasDestino.length) {
            console.log(`A conta ${contaOrigemProcurada.getNumero()} possui saldo insuficiente para realizar a ordem bancária...`);
            return;
        }

        for (let contaDestino of contasDestino) {
            this.transferir(contaOrigem, contaDestino, valorTransf);
        }

        console.log("Ordem bancária realizada com sucesso!");
    }
}


export {Conta, Cliente, Banco}