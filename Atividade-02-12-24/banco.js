"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conta = exports.Cliente = exports.Banco = void 0;
var cliente_1 = require("./cliente");
Object.defineProperty(exports, "Cliente", { enumerable: true, get: function () { return cliente_1.Cliente; } });
var conta_1 = require("./conta");
Object.defineProperty(exports, "Conta", { enumerable: true, get: function () { return conta_1.Conta; } });
var Banco = /** @class */ (function () {
    function Banco() {
        this.proximoIdConta = 1;
        this.proximoIdCliente = 1;
        this.contas = [];
        this.clientes = [];
    }
    Banco.prototype.inserirConta = function (num) {
        var novoId;
        for (var _i = 0, _a = this.contas; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.numero === num) {
                console.log("Já existe uma conta com esse numero!!!");
                return;
            }
        }
        do {
            novoId = this.proximoIdConta++;
        } while (this.consultarConta(novoId.toString()) !== undefined);
        var novaConta = new conta_1.Conta(novoId, num, 0);
        console.log("A conta ".concat(novaConta.numero, " foi criada com sucesso."));
        this.contas.push(novaConta);
    };
    Banco.prototype.inserirCliente = function (cliente) {
        var novoIdCliente;
        for (var _i = 0, _a = this.clientes; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.id === cliente.id || c.cpf === cliente.cpf) {
                console.error("Já existe um cliente com esse ID ou CPF!!");
                return;
            }
        }
        do {
            novoIdCliente = this.proximoIdCliente++;
        } while (this.consultarCliente(cliente.cpf) !== undefined);
        cliente.id = novoIdCliente;
        this.clientes.push(cliente);
        console.log("O cliente ".concat(cliente.nome, " foi adicionado com sucesso."));
    };
    Banco.prototype.consultarConta = function (numero) {
        var contaProcurada;
        for (var _i = 0, _a = this.contas; _i < _a.length; _i++) {
            var conta = _a[_i];
            if (conta.numero == numero) {
                contaProcurada = conta;
                break;
            }
        }
        return contaProcurada;
    };
    Banco.prototype.consultarCliente = function (cpf) {
        var clienteDesejado;
        for (var _i = 0, _a = this.clientes; _i < _a.length; _i++) {
            var cliente = _a[_i];
            if (cliente.cpf === cpf) {
                clienteDesejado = cliente;
                break;
            }
        }
        return clienteDesejado;
    };
    /*c) Associar um cliente a uma conta
    • Método: associarContaCliente(numeroConta: string, cpfCliente:
    string): void
    • Procure o cliente e a conta com os dados fornecidos e associe-os,
    respeitando considernado que o cliente não pode ter a mesma conta
    adicionada mais de uma vez. */
    Banco.prototype.associarContaCliente = function (numeroConta, cpfCliente) {
        var conta = this.consultarConta(numeroConta);
        var cliente = this.consultarCliente(cpfCliente);
        if (!conta || !cliente) {
            console.error("Cliente ou conta não encontrados");
            return;
        }
        if (conta.dono) {
            console.error("Essa conta já está associada a um cliente!!");
            return;
        }
        cliente.adicionarConta(conta);
        conta.dono = cliente;
        console.log("Conta ".concat(conta.numero, " foi associada ao cliente ").concat(conta.dono.nome));
    };
    /*d) Listar contas de um cliente
    • Método: listarContasCliente(cpf: string): Conta[]
    • Retorne todas as contas associadas ao cliente cujo CPF foi
    informado.*/
    Banco.prototype.listarContasCliente = function (cpf) {
        var cliente = this.consultarCliente(cpf);
        if (!cliente) {
            console.error("Cliente não encontrado!");
            return [];
        }
        return this.contas.filter(function (conta) { return conta.dono.cpf === cliente.cpf; });
    };
    /*e) Totalizar saldo por cliente
    • Método: totalizarSaldoCliente(cpf: string): number
    • Calcule e retorne o saldo total de todas as contas de um cliente.
    */
    Banco.prototype.totalizarSaldoCliente = function (cpf) {
        var cliente = this.consultarCliente(cpf);
        if (!cliente) {
            console.error("Cliente não encontrado!!");
            return;
        }
        var soma = 0;
        for (var _i = 0, _a = cliente.listarContas(); _i < _a.length; _i++) {
            var contaCliente = _a[_i];
            soma += contaCliente.consultarSaldo();
        }
        return soma;
    };
    Banco.prototype.depositar = function (numero, valor) {
        var contaProcurada = this.consultarConta(numero);
        if (!contaProcurada) {
            console.error("Conta nao encontrada!");
            return;
        }
        contaProcurada.depositar(valor);
    };
    Banco.prototype.consultarIndice = function (numeroConta) {
        var indiceProcurado = -1;
        for (var i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero === numeroConta) {
                indiceProcurado = i;
                break;
            }
        }
        return indiceProcurado;
    };
    Banco.prototype.excluirConta = function (numeroConta) {
        var indice = this.consultarIndice(numeroConta);
        if (indice === -1) {
            console.error("Conta nao encontrada!");
            return;
        }
        for (var i = indice; i < this.contas.length; i++) {
            this.contas[i] = this.contas[i + 1];
        }
        this.contas.pop();
    };
    Banco.prototype.atualizaConta = function (novaConta) {
        var indice = this.consultarIndice(novaConta.numero);
        if (indice === -1) {
            console.error("Conta nao encontrada!");
            return;
        }
        novaConta.id = this.contas[indice].id;
        this.contas[indice] = novaConta;
    };
    //sacar,depositar e transferir
    Banco.prototype.sacar = function (numConta, valor) {
        var contaProcurada = this.consultarConta(numConta);
        if (!contaProcurada) {
            console.error("Conta nao encontrada!");
            return;
        }
        contaProcurada.sacar(valor);
        console.log("Saque de R$ ".concat(valor.toFixed(2), " da conta ").concat(contaProcurada.numero, " realizado com sucesso"));
    };
    Banco.prototype.transferir = function (contaOrigem, contaDestino, valor) {
        var contaOrigemProc = this.consultarConta(contaOrigem);
        var contaDestinoProc = this.consultarConta(contaDestino);
        if (!contaOrigemProc || !contaDestinoProc) {
            console.error("Conta de origem ou destino nao encontrada!");
            return;
        }
        contaOrigemProc.transferir(contaDestinoProc, valor);
        console.log("Transferencia de ".concat(contaOrigemProc.numero, " para ").concat(contaDestinoProc.numero, " realizada com sucesso"));
    };
    Banco.prototype.contarContas = function () {
        return this.contas.length;
    };
    Banco.prototype.somatorioContas = function () {
        return this.contas.reduce(function (total, conta) { return total + conta.saldo; }, 0);
    };
    Banco.prototype.mediaContas = function () {
        return this.somatorioContas() / this.contarContas();
    };
    Banco.prototype.transferirArrayContas = function (numContaOrigem, valor) {
        var arrayNumContas = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            arrayNumContas[_i - 2] = arguments[_i];
        }
        var contaOrigem = this.consultarConta(numContaOrigem);
        if (!contaOrigem) {
            console.error("Conta origem não encontrada!");
            return;
        }
        for (var _a = 0, arrayNumContas_1 = arrayNumContas; _a < arrayNumContas_1.length; _a++) {
            var numConta = arrayNumContas_1[_a];
            var conta = this.consultarConta(numConta);
            if (!conta) {
                console.log("Conta de numero ".concat(numConta, " n\u00E3o encontrada..."));
                continue;
            }
            this.transferir(contaOrigem.numero, conta.numero, valor);
            console.log("A conta ".concat(numContaOrigem, " transferiu R$ ").concat(valor.toFixed(2), " para a conta ").concat(numConta));
        }
    };
    return Banco;
}());
exports.Banco = Banco;
