class ControleDeAudio {
    volume: number;

    // Construtor da classe 
    constructor() {
        this.volume = 2;
    }
    
    // Incrementa o volume em 1 caso o volume seja menor que 10
    aumentarVolume() : void {
        if (this.volume < 10){ 
            this.volume++;
            console.log("Volume aumentado...");
            return;
        }
        
        console.log("O volume ja está no máximo!");
    }

    // Decrementa o volume em 1 caso o volume seja superior a 0
    diminuirVolume() : void {
        if (this.volume > 0){
            this.volume--;
            console.log("Volume diminuído...");
            return;
        } 
        console.log("O volume ja está no mínimo.");
    }

    // Retorna o volume do objeto
    lerVolume() : number {
        return this.volume;
    }
}

var vol : ControleDeAudio = new ControleDeAudio;
console.log("Volume inicial:", vol.lerVolume());
for (let i = 0; i < 9; i++){   
    vol.aumentarVolume();
}

console.log("Volume atualizado:", vol.lerVolume());

vol.diminuirVolume();
vol.diminuirVolume();
vol.diminuirVolume();

console.log("Volume após diminuição:", vol.lerVolume());