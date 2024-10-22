var ControleDeAudio = /** @class */ (function () {
    function ControleDeAudio() {
        this.volume = 2;
    }
    ControleDeAudio.prototype.aumentarVolume = function () {
        if (this.volume < 10) {
            this.volume++;
            console.log("Volume aumentado...");
            return;
        }
        console.log("O volume ja está no máximo!");
    };
    ControleDeAudio.prototype.diminuirVolume = function () {
        if (this.volume > 0) {
            this.volume--;
            console.log("Volume diminuído...");
            return;
        }
        console.log("O volume ja está no mínimo.");
    };
    ControleDeAudio.prototype.lerVolume = function () {
        return this.volume;
    };
    return ControleDeAudio;
}());
var vol = new ControleDeAudio;
console.log("Volume inicial:", vol.lerVolume());
for (var i = 0; i < 9; i++) {
    vol.aumentarVolume();
}
console.log("Volume atualizado: ", vol.lerVolume());
vol.diminuirVolume();
vol.diminuirVolume();
vol.diminuirVolume();
console.log("Volume após diminuição: ", vol.lerVolume());
