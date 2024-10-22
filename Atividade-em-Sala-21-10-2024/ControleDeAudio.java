public class ControleDeAudio {
    private Integer volume;

    // Construtor da classe
    public ControleDeAudio() {
        this.volume = 2;
    }

    // Lê o volume do objeto
    public Integer lerVolume() {
        return this.volume;
    }

    // Aumenta o volume em 1 caso ele seja menor do que 10
    public void aumentarVolume(){
        if (this.volume < 10){
            this.volume++;
            System.out.println("Volume aumentado...");
            return;
        }

        System.err.println("Erro ao aumentar volume: Volume já está no máximo!");
    }

    // Diminui o volume em 1, mas nunca deixa ele menor que 0
    public void diminuirVolume(){
        if (this.volume > 0){
            this.volume--;
            System.out.println("Volume diminuído...");
            return;
        }

        System.err.println("Erro ao diminuir volume: Volume já está no mínimo!");
    }
    
}