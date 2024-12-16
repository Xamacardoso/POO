
class Conta {
    id: number;
    numero: string;
    saldo: number;
    cliente!: Cliente;

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
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: Date;
    contas: Conta[];

    constructor(nome: string, cpf: string, dataNascimento: Date) {
        this.id = 0;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.contas = [];
    }

    removerConta(numConta: string): void {  
        let indiceProcurado: number = -1;
        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numConta) {
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

}

class Banco {
    contas: Conta[];
    clientes: Cliente[];
    idClienteAtual: number;
    idContaAtual: number;

    constructor() {
        this.contas = [];
        this.clientes = [];
        this.idClienteAtual = 1;
        this.idContaAtual = 1;
    }

    inserirConta(conta: Conta) {
        conta.id = this.idContaAtual++;
        this.contas.push(conta);
    }

    consultarConta(numero: string): Conta {
        let contaProcurada!: Conta;

        for (let conta of this.contas) {
            if (conta.numero == numero ) {
                contaProcurada = conta;
                break;
            }
        }

        return contaProcurada;
    }

    consultarContaPorIndice(numero: string): number {
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
    excluirConta(numero: string): void {
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

    alterar(conta: Conta): void {
        let contaProcurada: Conta = this.consultarConta(conta.numero);

        if (contaProcurada) {
            contaProcurada = conta;
        }
    }

    inserirCliente(cliente: Cliente): void {
        cliente.id = this.idClienteAtual++
        this.clientes.push(cliente);
    }

    consultarCliente(cpf: string): Cliente {
        let clienteProcurado!: Cliente;

        for (let cliente of this.clientes) {
            if (cliente.cpf == cpf) {
                clienteProcurado = cliente;
            }
        }
        return clienteProcurado;
    }

    excluirCliente(cpfCliente: string): void {
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

    sacar(numero: string, valor: number): void {
        let contaProcurada: Conta = this.consultarConta(numero);

        if (contaProcurada) {
            contaProcurada.sacar(valor);
        }
    }

    depositar(numero: string, valor: number): void {
        let contaProcurada: Conta = this.consultarConta(numero);

        if (contaProcurada) {
            contaProcurada.depositar(valor);
        }
    }

    transferir(numeroOrigem: string, numeroDestino: string, valor: number): void {
        let contaOrigem: Conta = this.consultarConta(numeroOrigem);
        let contaDestino: Conta = this.consultarConta(numeroDestino);

        if (contaOrigem && contaDestino) {
            contaOrigem.transferir(contaDestino, valor);
        }
    }


    associarContaCliente(numeroConta: string, cpfCliente: string): void {
        let contaProcurada: Conta = this.consultarConta(numeroConta);
        let clienteProcurado: Cliente = this.consultarCliente(cpfCliente);

        if (contaProcurada && clienteProcurado && !contaProcurada.cliente) {
            contaProcurada.cliente = clienteProcurado;
            clienteProcurado.contas.push(contaProcurada);
        }
    }

    jaExisteContaParaCliente(cliente: Cliente, conta: Conta): boolean {
        let jaExiste: boolean = false;

        if (conta.cliente != null) {
            if (conta.cliente.cpf == cliente.cpf) {
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

    listarContasCliente(cpf: string): Conta[] {
        let clienteProcurado: Cliente = this.consultarCliente(cpf);
        let contas: Conta[] = [];

        if (clienteProcurado) {
            contas = clienteProcurado.contas;
        }
        return contas;
    }

    totalizarSaldoCliente(cpf: string): number {
        let clienteProcurado: Cliente = this.consultarCliente(cpf);
        let total: number = 0;
        if (clienteProcurado) {
            for (let conta of clienteProcurado.contas) {
                total += conta.saldo
            }
        }

        return total;
    }


    obterQuantidadeDeContas(): number {
        return this.contas.length;
    }


    obterTotalDinheiroDepositado(): number {
        let total: number = 0;

        for (let conta of this.contas) {
            total = total + conta.saldo;
        }
        return total ;
    }


    calcularMediaSaldoContas(): number {
        return this.obterTotalDinheiroDepositado()/this.obterQuantidadeDeContas();
    }

    mudarTitularidadeConta(numeroConta: string, cpfNovoTitular: string): void {
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
        for (let conta of contaProcurada.cliente.contas) {
            if (conta.numero == contaProcurada.numero) {
                // Percorre a lista de contas do cliente antigo e remove a selecionada
                for (let i = contaProcurada.cliente.contas.indexOf(conta);
                i < contaProcurada.cliente.contas.length - 1; i++) {
                    contaProcurada.cliente.contas[i] = contaProcurada.cliente.contas[i + 1];
                }
                contaProcurada.cliente.contas.pop();
            }
        }

        // Adiciona a conta ao outro cliente
        contaProcurada.cliente = clienteProcurado;
        clienteProcurado.contas.push(contaProcurada);
    }

    obterContasSemCliente(): Conta[] {
        let contasSemCliente: Conta[] = [];

        for (let conta of this.contas) {
            if (!conta.cliente) {
                contasSemCliente.push(conta);            
            }
        }

        return contasSemCliente;
    }

    ordemBancaria(contaOrigem: string, contasDestino: string[], valorTransf: number): void {
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
}


export {Conta, Cliente, Banco}