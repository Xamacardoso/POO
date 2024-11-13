class Maior {
    id: number

    constructor (id:number) {
        this.id = id;
    }

    criarClasse():void {
        class Coisa {
            txt: string
        }

        let variavel: Coisa;

        console.log(variavel);
    }
}

let objeto = new Maior(1);
objeto.criarClasse();