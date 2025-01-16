import { Conta } from "./banco";

export class ContaImposto extends Conta {
    private _taxaImposto: number = 0.38/100;

    public sacar(valor: number): void {
        let imposto: number = valor * this._taxaImposto;
        let totalSaque: number = valor + imposto;
        super.sacar(totalSaque);
    }
}