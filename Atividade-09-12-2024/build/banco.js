"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banco = exports.Cliente = exports.Conta = void 0;
class Conta {
    constructor(numero, saldo) {
        this.id = 0;
        this.numero = numero;
        this.saldo = saldo;
    }
    sacar(valor) {
        this.saldo = this.saldo - valor;
    }
    depositar(valor) {
        this.saldo = this.saldo + valor;
    }
    consultarSaldo() {
        return this.saldo;
    }
    transferir(contaDestino, valor) {
        // this.saldo = this.saldo - valor;
        // contaDestino.saldo = contaDestino.saldo + valor;
        this.sacar(valor);
        contaDestino.depositar(valor);
    }
}
exports.Conta = Conta;
class Cliente {
    constructor(nome, cpf, dataNascimento) {
        this.id = 0;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.contas = [];
    }
    removerConta(numConta) {
        let indiceProcurado = -1;
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
exports.Cliente = Cliente;
class Banco {
    constructor() {
        this.contas = [];
        this.clientes = [];
        this.idClienteAtual = 1;
        this.idContaAtual = 1;
    }
    inserirConta(conta) {
        conta.id = this.idContaAtual++;
        this.contas.push(conta);
    }
    consultarConta(numero) {
        let contaProcurada;
        for (let conta of this.contas) {
            if (conta.numero == numero) {
                contaProcurada = conta;
                break;
            }
        }
        return contaProcurada;
    }
    consultarContaPorIndice(numero) {
        let indiceProcurado = -1;
        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }
        return indiceProcurado;
    }
    // Refatorado
    excluirConta(numero) {
        let indiceProcurado = this.consultarContaPorIndice(numero);
        if (indiceProcurado != -1) {
            this.contas[indiceProcurado].cliente.removerConta(numero); // Remove a conta entre as contas do cliente
            for (let i = indiceProcurado; i < this.contas.length - 1; i++) {
                this.contas[i] = this.contas[i + 1];
            }
            this.contas.pop();
        }
    }
    alterar(conta) {
        let contaProcurada = this.consultarConta(conta.numero);
        if (contaProcurada) {
            contaProcurada = conta;
        }
    }
    inserirCliente(cliente) {
        cliente.id = this.idClienteAtual++;
        this.clientes.push(cliente);
    }
    consultarCliente(cpf) {
        let clienteProcurado;
        for (let cliente of this.clientes) {
            if (cliente.cpf == cpf) {
                clienteProcurado = cliente;
            }
        }
        return clienteProcurado;
    }
    excluirCliente(cpfCliente) {
        let clienteProcurado = this.consultarCliente(cpfCliente);
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
    sacar(numero, valor) {
        let contaProcurada = this.consultarConta(numero);
        if (contaProcurada) {
            contaProcurada.sacar(valor);
        }
    }
    depositar(numero, valor) {
        let contaProcurada = this.consultarConta(numero);
        if (contaProcurada) {
            contaProcurada.depositar(valor);
        }
    }
    transferir(numeroOrigem, numeroDestino, valor) {
        let contaOrigem = this.consultarConta(numeroOrigem);
        let contaDestino = this.consultarConta(numeroDestino);
        if (contaOrigem && contaDestino) {
            contaOrigem.transferir(contaDestino, valor);
        }
    }
    associarContaCliente(numeroConta, cpfCliente) {
        let contaProcurada = this.consultarConta(numeroConta);
        let clienteProcurado = this.consultarCliente(cpfCliente);
        if (contaProcurada && clienteProcurado && !contaProcurada.cliente) {
            contaProcurada.cliente = clienteProcurado;
            clienteProcurado.contas.push(contaProcurada);
        }
    }
    jaExisteContaParaCliente(cliente, conta) {
        let jaExiste = false;
        if (conta.cliente != null) {
            if (conta.cliente.cpf == cliente.cpf) {
                jaExiste = true;
            }
            else {
                for (let contaAssociada of cliente.contas) {
                    if (contaAssociada.numero == conta.numero) {
                        jaExiste = true;
                    }
                }
            }
        }
        return jaExiste;
    }
    listarContasCliente(cpf) {
        let clienteProcurado = this.consultarCliente(cpf);
        let contas = [];
        if (clienteProcurado) {
            contas = clienteProcurado.contas;
        }
        return contas;
    }
    totalizarSaldoCliente(cpf) {
        let clienteProcurado = this.consultarCliente(cpf);
        let total = 0;
        if (clienteProcurado) {
            for (let conta of clienteProcurado.contas) {
                total += conta.saldo;
            }
        }
        return total;
    }
    obterQuantidadeDeContas() {
        return this.contas.length;
    }
    obterTotalDinheiroDepositado() {
        let total = 0;
        for (let conta of this.contas) {
            total = total + conta.saldo;
        }
        return total;
    }
    calcularMediaSaldoContas() {
        return this.obterTotalDinheiroDepositado() / this.obterQuantidadeDeContas();
    }
    mudarTitularidadeConta(numeroConta, cpfNovoTitular) {
        let contaProcurada = this.consultarConta(numeroConta);
        let clienteProcurado = this.consultarCliente(cpfNovoTitular);
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
                for (let i = contaProcurada.cliente.contas.indexOf(conta); i < contaProcurada.cliente.contas.length - 1; i++) {
                    contaProcurada.cliente.contas[i] = contaProcurada.cliente.contas[i + 1];
                }
                contaProcurada.cliente.contas.pop();
            }
        }
        // Adiciona a conta ao outro cliente
        contaProcurada.cliente = clienteProcurado;
        clienteProcurado.contas.push(contaProcurada);
    }
    obterContasSemCliente() {
        let contasSemCliente = [];
        for (let conta of this.contas) {
            if (!conta.cliente) {
                contasSemCliente.push(conta);
            }
        }
        return contasSemCliente;
    }
    ordemBancaria(contaOrigem, contasDestino, valorTransf) {
        let contaOrigemProcurada = this.consultarConta(contaOrigem);
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
        if (contaOrigemProcurada.saldo < valorTransf * contasDestino.length) {
            console.log(`A conta ${contaOrigemProcurada.numero} possui saldo insuficiente para realizar a ordem bancária...`);
            return;
        }
        for (let contaDestino of contasDestino) {
            this.transferir(contaOrigem, contaDestino, valorTransf);
        }
        console.log("Ordem bancária realizada com sucesso!");
    }
}
exports.Banco = Banco;
