class CalculadoraCientifica extends Calculadora {
    constructor(op1: number, op2: number){
        super(op1, op2);
    }

    // Q3 - c) Sim, foi necessário fazer métodos de
    // get e set para obter os atributos para o metodo
    public exponenciar(): number{
        return Math.pow(this.op1, this.op2);
    }
}