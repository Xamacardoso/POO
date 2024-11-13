/*10. Crie uma classe chamada Jogador e nela:
• Crie 3 atributos inteiros representando força, nível e pontos atuais;
• Crie um construtor no qual os 3 parâmetros são passados e inicialize os
respectivos atributos;
• Crie um método chamado calcularAtaque. Nele, calcule e retorne o valor da
multiplicação de força pelo nível. Esse resultado é o dano de ataque do
jogador;
• Crie um método chamado atacar em que é passado um outro jogador
(atacado) como parâmetro. Nele e é feita a subtração do dano (método
calcularAtaque) dos pontos do atacado;
• Crie um método chamado estaVivo que retorna true caso o atributo pontos
do jogador seja maior que zero e falso caso contrário.
• Altere o método atacar para usar o método está vivo e desconsiderar a
operação, ou seja, não atacar, caso o jogador passado por parâmetro não
esteja vivo.
• Crie um método chamado toString() que retorna a representação textual do
jogador concatenando todos os seus atributos.
• Avalie em com testes dois jogadores instanciados e inicializados através do
construtor. Utilize o método de ataque de cada jogador e ao final, verifique
qual jogador tem mais pontos.  */
var Jogador = /** @class */ (function () {
    function Jogador(forca, nivel, pontos) {
        this.forca = forca;
        this.nivel = nivel;
        this.pontos = pontos;
    }
    Jogador.prototype.calcularAtq = function () {
        return this.forca * this.nivel;
    };
    Jogador.prototype.atacar = function (inimigo) {
        if (inimigo.estaVivo()) {
            inimigo.pontos -= this.calcularAtq();
        }
    };
    Jogador.prototype.estaVivo = function () {
        return this.pontos > 0;
    };
    Jogador.prototype.toString = function () {
        return "Forca: ".concat(this.forca, " | Nivel: ").concat(this.nivel, " | Pontos: ").concat(this.pontos);
    };
    return Jogador;
}());
var j1 = new Jogador(4, 5, 30);
var j2 = new Jogador(2, 3, 24);
j1.atacar(j2);
console.log(j2.toString());
j1.atacar(j2);
console.log(j2.toString());
j1.atacar(j2);
console.log(j2.toString());
