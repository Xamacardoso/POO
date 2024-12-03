"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
/*1) Classe Cliente
Crie uma classe Cliente com os seguintes atributos:
• id: Identificador único do cliente (número).
• nome: Nome completo do cliente (string).
• cpf: CPF único do cliente (string).
• dataNascimento: Data de nascimento do cliente (Date).
• contas: Array de contas associadas ao cliente.*/
var Cliente = /** @class */ (function () {
    function Cliente(id, nome, cpf, dataNasc) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNasc = dataNasc;
        this.contas = [];
    }
    Cliente.prototype.adicionarConta = function (conta) {
        for (var _i = 0, _a = this.contas; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.id === conta.id || c.numero === conta.numero) {
                console.log("Conta com o mesmo id ou número já está associada a este cliente");
                return;
            }
        }
        this.contas.push(conta);
    };
    // listar as contas do cliente 
    Cliente.prototype.listarContas = function () {
        return this.contas;
    };
    // calcular o saldo total do cliente 
    Cliente.prototype.totalizarSaldo = function () {
        return this.contas.reduce(function (total, conta) { return total + conta.saldo; }, 0);
    };
    return Cliente;
}());
exports.Cliente = Cliente;
