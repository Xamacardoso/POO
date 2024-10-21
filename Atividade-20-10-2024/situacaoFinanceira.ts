class SituacaoFinanceira {
    private valorCreditos: number;
    private valorDebitos: number;

    constructor (cred: number, deb: number){
        this.valorCreditos = cred;
        this.valorDebitos = deb;
    }

    getDebitos() : number {
        return this.valorDebitos;
    }

    getCreditos() : number {
        return this.valorDebitos;
    }

    setDebitos(deb: number) : void {
        this.valorDebitos = deb;
    }

    setCreditos(cred: number) : void {
        this.valorCreditos = cred;
    }

    calcularSaldo() : number{
        return this.valorCreditos - this.valorDebitos;
    }
}