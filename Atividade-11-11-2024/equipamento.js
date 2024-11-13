/*8. Uma classe Equipamento com:
    a. um atributo ligado (tipo boolean)
    b. dois métodos liga() e desliga(). O método liga torna o atributo ligado true e
        o método desliga torna o atributo ligado false.
    c. Crie um método chamado inverte(), que muda o status atual (se ligado,
        desliga...se desligado, liga)
    d. Crie um método que estaLigado() que retorna o valor do atributo ligado
    e. Altere o comportamento do método ligar() para caso o equipamento já
        esteja ligado, não ligue novamente. Faça o mesmo com o método
        desligar().
    f.Instancie uma classe Equipamento e teste todos os seus métodos. */
var Equipamento = /** @class */ (function () {
    // Consideramos que todo equipamento começa desligado, depois algúem liga ele.
    function Equipamento() {
        this.ligado = false;
    }
    Equipamento.prototype.liga = function () {
        if (!this.ligado) {
            this.ligado = true;
        }
    };
    Equipamento.prototype.desliga = function () {
        if (this.ligado) {
            this.ligado = false;
        }
    };
    Equipamento.prototype.inverte = function () {
        this.ligado = !this.ligado;
    };
    Equipamento.prototype.estaLigado = function () {
        return this.ligado;
    };
    return Equipamento;
}());
var equip = new Equipamento();
equip.liga();
equip.desliga();
equip.inverte();
equip.liga();
console.log(equip.estaLigado());
