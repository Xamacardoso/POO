
/* 2 - Podemos afirmar que haverá um problema de compilação, pois a variável inteira não 
foi inicializada previamente? Justifique.
R: Não haverá problema de compilação, porém a variável quantReservas não será
devidamente incrementada. Ela receberá o valor NaN.
*/
class Hotel { 
    quantReservas : number; 

    /* 3 - Adicione o construtor que aceite um parâmetro inteiro e faça a inicialização do atributo 
    quantReservas.*/
    constructor(quantReservas: number) {
        this.quantReservas = quantReservas;
    }

    adicionarReserva() : void  { 
        this.quantReservas++;
    } 
} 

let hotel : Hotel = new Hotel(2); 
console.log("No. de reservas do hotel: ", hotel.quantReservas);

