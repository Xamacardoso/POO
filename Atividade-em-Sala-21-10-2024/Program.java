public class Program {
    public static void main(String[] args) {
        ControleDeAudio volControle = new ControleDeAudio();
        System.out.println("Volume inicial: " + volControle.lerVolume());

        volControle.aumentarVolume();
        volControle.aumentarVolume();
        volControle.diminuirVolume();
        volControle.aumentarVolume();

        System.out.println("Novo volume: " + volControle.lerVolume());
    }
}
