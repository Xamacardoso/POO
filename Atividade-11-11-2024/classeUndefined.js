var Maior = /** @class */ (function () {
    function Maior(id) {
        this.id = id;
    }
    Maior.prototype.criarClasse = function () {
        var variavel = /** @class */ (function () {
            function Coisa() {
            }
            return Coisa;
        }());
        console.log(variavel);
    };
    return Maior;
}());
var objeto = new Maior(1);
objeto.criarClasse();
