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

class Jogador {
    forca: number;
    nivel: number;
    pontos: number;

    constructor(forca: number, nivel: number, pontos: number){
        this.forca = forca;
        this.nivel = nivel;
        this.pontos = pontos;
    }


    calcularAtq(): number {
        return this.forca * this.nivel;
    }


    atacar(inimigo: Jogador){
        if (inimigo.estaVivo()){
            inimigo.pontos -= this.calcularAtq();
        }
    }

    estaVivo(): boolean {
        return this.pontos > 0;
    }


    toString() {
        return `Forca: ${this.forca} | Nivel: ${this.nivel} | Pontos: ${this.pontos}`;
    }
}

let j1: Jogador = new Jogador(4,5,30);
let j2: Jogador = new Jogador(2,3,24);

j1.atacar(j2);
console.log(j2.toString());
j1.atacar(j2);
console.log(j2.toString());
j1.atacar(j2);
console.log(j2.toString());

/* 11 -  A abordagem da questão 9 é retornar códigos de erro ou acerto. Já a da questão 
10 é desconsiderar a alteração. Quais das duas você acha mais correta? Compare 
com seus códigos escritos em outras disciplinas 

R: Acredito que fazer a verificação para executar a função é mais correto, pois
trabalha mais a lógica por trás da execução dos métodos, tornando-a mais controlada.
*/