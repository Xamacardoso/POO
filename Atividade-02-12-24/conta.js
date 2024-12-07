"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conta = void 0;
/*2) Classe Conta
Atualize a classe Conta para incluir os seguintes atributos:
• id: Identificador único da conta (número).
• cliente: Cliente associado à conta. */
var Conta = /** @class */ (function () {
    function Conta(id, numero, saldo) {
        this.id = id;
        this.numero = numero;
        this.saldo = saldo;
    }
    Conta.prototype.sacar = function (valor) {
        this.saldo = this.saldo - valor;
    };
    Conta.prototype.depositar = function (valor) {
        this.saldo = this.saldo + valor;
    };
    Conta.prototype.consultarSaldo = function () {
        return this.saldo;
    };
    Conta.prototype.transferir = function (contaDestino, valor) {
        this.sacar(valor);
        contaDestino.depositar(valor);
    };
    return Conta;
}());
exports.Conta = Conta;
