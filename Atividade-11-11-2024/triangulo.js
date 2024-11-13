/*7. Crie uma classe chamada Triangulo que:
• Possua 3 atributos inteiros representando os lados;
• Crie um método que retorna true se os lados formarem um triângulo de
acordo com a regra: |b-c| < a < b+c;
• Crie 3 métodos: ehIsoceles(), ehEquilatero() e ehEscaleno() que retorne
verdadeiro caso o triângulo seja um dos tipos relacionados ao nome do
método. Eles devem chamar antes de tudo, o método da questão b. e
retornar false se esse método já retornar false também;
• Instancie classes Triangulo de diferentes lados e seus métodos.  */
var Triangulo = /** @class */ (function () {
    function Triangulo(la, lb, lc) {
        this.ladoA = la;
        this.ladoB = lb;
        this.ladoC = lc;
    }
    Triangulo.prototype.ehTriangulo = function () {
        return Math.abs(this.ladoB - this.ladoC) < this.ladoA && this.ladoA < this.ladoB + this.ladoC;
    };
    Triangulo.prototype.ehIsosceles = function () {
        if (this.ehTriangulo()) {
            return (this.ladoA == this.ladoB ||
                this.ladoA == this.ladoC ||
                this.ladoB == this.ladoC);
        }
        return false;
    };
    Triangulo.prototype.ehEscaleno = function () {
        if (this.ehTriangulo()) {
            return (this.ladoA != this.ladoB &&
                this.ladoB != this.ladoC);
        }
        return false;
    };
    Triangulo.prototype.ehEquilatero = function () {
        if (this.ehTriangulo()) {
            return (this.ladoA == this.ladoB && this.ladoB == this.ladoC);
        }
        return false;
    };
    return Triangulo;
}());
var tri1 = new Triangulo(2, 3, 4);
var tri2 = new Triangulo(12, 12, 12);
var tri3 = new Triangulo(12, 12, 14);
console.log("\n    Triangulo 1:\n    ehTriangulo : ".concat(tri1.ehTriangulo(), "\n    ehIsosceles : ").concat(tri1.ehIsosceles(), "\n    ehEscaleno  : ").concat(tri1.ehEscaleno(), "\n    ehEquilatero: ").concat(tri1.ehEquilatero(), "\n\n    Triangulo 2:\n    ehTriangulo : ").concat(tri2.ehTriangulo(), "\n    ehIsosceles : ").concat(tri2.ehIsosceles(), "\n    ehEscaleno  : ").concat(tri2.ehEscaleno(), "\n    ehEquilatero: ").concat(tri3.ehEquilatero(), "\n\n    Triangulo 3:\n    ehTriangulo : ").concat(tri3.ehTriangulo(), "\n    ehIsosceles : ").concat(tri3.ehIsosceles(), "\n    ehEscaleno  : ").concat(tri3.ehEscaleno(), "\n    ehEquilatero: ").concat(tri3.ehEquilatero(), "\n    "));
