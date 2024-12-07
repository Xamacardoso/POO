"use strict";
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
    constructor() {
        this.id = 0;
        this.texto = "";
        this.qtdCurtidas = 0;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getTexto() {
        return this.texto;
    }
    setTexto(texto) {
        this.texto = texto;
    }
    getQtdCurtidas() {
        return this.qtdCurtidas;
    }
    setQtdCurtidas(qtdCurtidas) {
        this.qtdCurtidas = qtdCurtidas;
    }
    curtir() {
        this.qtdCurtidas++;
    }
    toString() {
        return `Postagem de ID ${this.getId()}: ${this.qtdCurtidas} curtidas`;
    }
}
