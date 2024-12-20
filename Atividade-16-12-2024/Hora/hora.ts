class Hora {
    constructor(private hora: number, private minuto: number, private segundo: number){

    }


    public toString(): string {
        const hh : string = this.hora < 10 ? `0${this.hora}` : String(this.hora);
        const mm : string = this.minuto < 10 ? `0${this.minuto}` : String(this.minuto);
        const ss : string = this.segundo < 10 ? `0${this.segundo}` : String(this.segundo);
        return `${hh}:${mm}:${ss}`;
    }



}