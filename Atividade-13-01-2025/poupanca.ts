import { Conta } from "./banco";


export class Poupanca extends Conta {
    private _taxajuros: number;

    constructor(numero: string, saldo: number, taxajuros: number){
        super(numero,saldo);
        this._taxajuros = taxajuros;
    }

    get taxajuros(): number{
        return this._taxajuros;
    }

    set taxajuros(taxajuros: number){
        this._taxajuros = taxajuros;
    }

    public renderJuros(){
        this.depositar(this._taxajuros * this.saldo);
    }
}