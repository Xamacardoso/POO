class Circulo {
    private raio : number = 0;
    
    constructor (raio: number){
        this.raio = raio;
    }

    getArea() : number {
        return Math.PI * (this.raio ** 2);
    }

    getPerimetro() : number {
        return 2 * Math.PI * this.raio;
    }
    
}

var meuCirculo : Circulo = new Circulo(8);
console.log(`Área do círculo: ${meuCirculo.getArea()}\nPerímetro desse mesmo círculo: ${meuCirculo.getPerimetro()}`);