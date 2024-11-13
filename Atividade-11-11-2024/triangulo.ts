/*7. Crie uma classe chamada Triangulo que: 
• Possua 3 atributos inteiros representando os lados; 
• Crie um método que retorna true se os lados formarem um triângulo de 
acordo com a regra: |b-c| < a < b+c; 
• Crie 3 métodos: ehIsoceles(), ehEquilatero() e ehEscaleno() que retorne 
verdadeiro caso o triângulo seja um dos tipos relacionados ao nome do 
método. Eles devem chamar antes de tudo, o método da questão b. e 
retornar false se esse método já retornar false também; 
• Instancie classes Triangulo de diferentes lados e seus métodos.  */

class Triangulo {
    ladoA: number;
    ladoB: number;
    ladoC: number;

    constructor (la:number, lb:number, lc:number) {
        this.ladoA = la;
        this.ladoB = lb;
        this.ladoC = lc;
    }

    ehTriangulo (): boolean {
        return Math.abs(this.ladoB - this.ladoC) < this.ladoA && this.ladoA < this.ladoB + this.ladoC;
    }

    ehIsosceles(): boolean {
        if (this.ehTriangulo()) {
            return (
                this.ladoA == this.ladoB ||
                this.ladoA == this.ladoC ||
                this.ladoB == this.ladoC
            );
        }

        return false;
    }


    ehEscaleno(): boolean {
        if (this.ehTriangulo()){
            return (
                this.ladoA != this.ladoB &&
                this.ladoB != this.ladoC
            );
        }

        return false;
    }


    ehEquilatero(): boolean {
        if (this.ehTriangulo()){
            return (this.ladoA == this.ladoB && this.ladoB == this.ladoC);
        }
        return false;
    }
}

let tri1: Triangulo = new Triangulo(2,3,4);
let tri2: Triangulo = new Triangulo(12,12,12);
let tri3: Triangulo = new Triangulo(12,12,14);

console.log(
    `
    Triangulo 1:
    ehTriangulo : ${tri1.ehTriangulo()}
    ehIsosceles : ${tri1.ehIsosceles()}
    ehEscaleno  : ${tri1.ehEscaleno()}
    ehEquilatero: ${tri1.ehEquilatero()}

    Triangulo 2:
    ehTriangulo : ${tri2.ehTriangulo()}
    ehIsosceles : ${tri2.ehIsosceles()}
    ehEscaleno  : ${tri2.ehEscaleno()}
    ehEquilatero: ${tri3.ehEquilatero()}

    Triangulo 3:
    ehTriangulo : ${tri3.ehTriangulo()}
    ehIsosceles : ${tri3.ehIsosceles()}
    ehEscaleno  : ${tri3.ehEscaleno()}
    ehEquilatero: ${tri3.ehEquilatero()}
    `
);