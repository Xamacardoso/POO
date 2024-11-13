class Radio { 
    volume : number; 
    
    constructor(volume : number) { 
        this.volume = volume; 
    } 
} 
// 4 - Justifique o erro de compilação e proponha uma solução.
// let r : Radio = new Radio();  # LINHA ERRADA 
let r : Radio = new Radio(9); // # SOLUÇÃO
r.volume = 10; 