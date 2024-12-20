class Calculadora {
    private op1: number;
    private op2: number;

    constructor(op1: number, op2: number) {
        this.op1 = op1;
        this.op2 = op2;
    }  

    public somar(): number {
        return this.op1 + this.op2;
    }

    public multiplicar(): number {
        return this.op1 * this.op2;
    }
}

const calc = new Calculadora(10, 20);
console.log(calc.somar());
console.log(calc.multiplicar());

/*As linhas abaixo gerariam um erro, pois o acesso direto
* aos atributos de calc é proibido, já que são privados. */

// console.log(calc.op1);
// console.log(calc.op2);