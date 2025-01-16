export class Produto {
    private _id: number;
    private _nome: string;
    private _quantidade: number;
    private _preco: number;
    constructor(id: number, nome: string, preco: number, quantidade: number) {
        this._id = id;
        this._nome = nome;
        this._preco = preco;
        this._quantidade = quantidade;
    }

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    public get nome(): string {
        return this._nome;
    }
    public set nome(nome: string) {
        this._nome = nome;
    }

    public get preco(): number {
        return this._preco;
    }
    public set preco(preco: number) {
        this._preco = preco;
    }

    public repor(qtd: number){
        this._quantidade += qtd;
    }

    public darBaixa(qtd: number){
        this._quantidade -= qtd;
    }
}