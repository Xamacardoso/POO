/*2. Crie uma implementação que simule um migroblog: 
a. Crie uma classe Postagem e nela: 
a. Crie os atributos: 
1. id do tipo number, representando o identificador da 
postagem; 
2. texto do tipo string, representando um texto da postagem; 
3. quantidadeCurtidas do tipo number; 
b. Crie  um  método  chamado  curtir  que  incrementa  a  quantidade 
curtidas; 
c. Crie um método chamado toString que retorna a concatenação da 
postagem com a quantidade de curtidas; */

class Postagem {
    private id: number;
    private texto: string;
    private qtdCurtidas: number;

    constructor() {
        this.id = 0;
        this.texto = "";
        this.qtdCurtidas = 0;
    }
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getTexto(): string {
        return this.texto;
    }

    public setTexto(texto: string): void {
        this.texto = texto;
    }

    public getQtdCurtidas(): number {
        return this.qtdCurtidas;
    }

    public setQtdCurtidas(qtdCurtidas: number): void {
        this.qtdCurtidas = qtdCurtidas;
    }

    public curtir(): void {
        this.qtdCurtidas++;
    }

    public toString(): string {
        return `Postagem de ID ${this.getId()}: ${this.qtdCurtidas} curtidas`;
    }
}