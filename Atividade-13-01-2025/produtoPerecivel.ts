import { Produto } from "./produto";	

export class ProdutoPerecivel extends Produto {
    private _dataValidade: Date;

    constructor(id: number, nome: string, preco: number, quantidade: number, dataValidade: Date) {
        super(id, nome, preco, quantidade);
        this._dataValidade = dataValidade;
    }

    get dataValidade(): Date {
        return this._dataValidade;
    }
    set dataValidade(dataValidade: Date) {
        this._dataValidade = dataValidade;
    }

    public verificarVencimento(): boolean {
        const dataAtual = new Date();
        return this.dataValidade > dataAtual;
    }

    override repor(qtd: number): void {
        if (this.verificarVencimento()) {
            super.repor(qtd);
        }
    }

    override darBaixa(qtd: number): void {
        if (this.verificarVencimento()) {
            super.darBaixa(qtd);
        }
    }
}