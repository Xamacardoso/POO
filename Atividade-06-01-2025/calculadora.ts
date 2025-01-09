class Calculadora {
    private _op1: number;
    private _op2: number;

    public get op1(): number {
        return this._op1;
    }

    public set op1(value: number) {
        this._op1 = value;
    }

    public get op2(): number {
        return this._op2;
    }

    public set op2(value: number) {
        this._op2 = value;
    }

    constructor(op1: number, op2: number) {
        this._op1 = op1;
        this._op2 = op2;
    }



    public somar(): number {
        return this.op1 + this.op2;
    }
}