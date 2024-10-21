class Retangulo {
    private l1: number = 0;
    private l2: number = 0;
    
    constructor(l1: number, l2: number){
        this.l1 = l1;
        this.l2 = l2;
    }

    getLadoA() : number {
        return this.l1;
    }

    getLadoB() : number {
        return this.l2;
    }
    
    setLados(val1: number, val2: number) : void{
        this.l1 = val1;
        this.l2 = val2;
    }

    getArea() : number {
        return this.l1 * this.l2;
    }

    getPerimetro() : number{
        return (2 * this.l1) + (2 * this.l2);
    }

}

var meuRetangulo: Retangulo = new Retangulo(4, 6);
console.log(`A área do meu retângulo de lados ${meuRetangulo.getLadoA()} e ${meuRetangulo.getLadoB()} é : ${meuRetangulo.getArea()}`);
console.log(`O perímetro desse mesmo retângulo é ${meuRetangulo.getPerimetro()}`);