"use strict";
/*b. Crie uma classe Microblog e nela:
a. Crie um array de classes Postagem;
b. Crie um método que inclua uma postagem passada como
parâmetro no array de postagens;
c. Crie  um  método  de  excluir  uma  postagem  que  recebe  um  id
passado  por  parâmetro.  Para  isso,  efetue  uma  busca  pelo  id  nas
postagens do array e faça a exclusão de forma análoga à feita na
classe Banco;
d. Crie um método que retorna a postagem mais curtida;
e. Crie um método curtir em que se passa um id como parâmetro e a
classe microblog pesquisa a postagem e chama seu método curtir
da própria postagem;
f. Crie um método toString que retorna a concatenação do “toString”
de todas as postagens. */
class Microblog {
    constructor() {
        this.postagens = [];
        this.idProxPostagem = 1;
    }
    adicionarPostagem(postagem) {
        let idNovaPostagem;
        do {
            idNovaPostagem = this.idProxPostagem++;
        } while (this.consultarIndexPostagem(idNovaPostagem) !== -1);
        postagem.setId(idNovaPostagem);
        this.postagens.push(postagem);
    }
    consultarIndexPostagem(id) {
        let indexPostagem = -1;
        for (let i = 0; i < this.postagens.length; i++) {
            if (this.postagens[i].getId() === id) {
                indexPostagem = i;
                break;
            }
        }
        return indexPostagem;
    }
    removerPostagem(id) {
        let indexRemover = this.consultarIndexPostagem(id);
        if (indexRemover === -1) {
            console.error(`Postagem de id ${id} não encontrada`);
            return;
        }
        for (let i = indexRemover; i < this.postagens.length; i++) {
            this.postagens[i] = this.postagens[i + 1];
        }
        this.postagens.pop();
    }
    postagemMaisCurtida() {
        let postagemMaisCurtida = this.postagens[0];
        if (this.postagens.length === 0) {
            console.error("Não há postagens para serem curtidas!!");
            return postagemMaisCurtida;
        }
        for (let i = 1; i < this.postagens.length; i++) {
            postagemMaisCurtida =
                this.postagens[i].getQtdCurtidas() > postagemMaisCurtida.getQtdCurtidas() ?
                    this.postagens[i] : postagemMaisCurtida;
        }
        return postagemMaisCurtida;
    }
    curtirPostagem(id) {
        let indexPostagem = this.consultarIndexPostagem(id);
        if (indexPostagem === -1) {
            console.error(`Postagem de id ${id} não encontrada`);
            return;
        }
        this.postagens[indexPostagem].curtir();
    }
    toString() {
        let stringPostagens = "";
        if (this.postagens.length === 0) {
            console.error("Não há postagens para serem mostradas!!");
            return stringPostagens;
        }
        for (let postagem of this.postagens) {
            stringPostagens += postagem.toString() + "\n";
        }
        return stringPostagens;
    }
}
