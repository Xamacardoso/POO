"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cliente_1 = require("./cliente");
var conta_1 = require("./conta");
var Banco = /** @class */ (function () {
    function Banco() {
        this.contas = [];
        this.clientes = [];
    }
    Banco.prototype.inserirConta = function (conta) {
        for (var _i = 0, _a = this.contas; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.id === conta.id || c.numero === conta.numero) {
                console.log("Já existe uma conta com esse ID ou numero!!!");
                return;
            }
        }
        console.log("A conta ".concat(conta.numero, " foi criada com sucesso."));
        this.contas.push(conta);
    };
    Banco.prototype.inserirCliente = function (cliente) {
        for (var _i = 0, _a = this.clientes; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.id === cliente.id || c.cpf === cliente.cpf) {
                console.error("Já existe um cliente com esse ID ou CPF!!");
                return;
            }
        }
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
        for (var _i = 0, _a = this.clientes; _i < _a.length; _i++) {
            var clienteBanco = _a[_i];
            for (var _b = 0, _c = clienteBanco.listarContas(); _b < _c.length; _b++) {
                var contaCliente = _c[_b];
                if (contaCliente.numero === conta.numero && clienteBanco.id === cliente.id) {
                    console.error("Essa conta já está associada a um cliente!!");
                    return;
                }
            }
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
        if (contaProcurada) {
            contaProcurada.depositar(valor);
        }
    };
    return Banco;
}());
var banco = new Banco();
var cliente1 = new cliente_1.Cliente(1, "Jota", "111.222.333-44", new Date());
var cliente2 = new cliente_1.Cliente(2, "Jotao", "111.222.333-45", new Date());
var conta1 = new conta_1.Conta(1, "1234", 500.0);
var conta2 = new conta_1.Conta(2, "1235", 500.0);
banco.inserirCliente(cliente1);
banco.inserirCliente(cliente2);
banco.inserirConta(conta1);
banco.inserirConta(conta2);
banco.associarContaCliente("1234", "111.222.333-44");
banco.associarContaCliente("1235", "111.222.333-44");
banco.depositar("1234", 500);
banco.depositar("1235", 700);
console.log(banco.consultarConta("1234").consultarSaldo());
console.log(banco.consultarConta("1235").consultarSaldo());
