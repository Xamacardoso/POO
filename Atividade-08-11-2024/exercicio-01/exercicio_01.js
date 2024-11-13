// Questao 1: funcao par ou impar
function evenOrInteger(n) {
    console.log("".concat(n, " eh ").concat(n % 2 ? "impar" : "par"));
    return n % 2 == 0;
}
// Questao 2: saudacao com parametro
function saludate(name, treatment) {
    if (treatment === void 0) { treatment = "Sr."; }
    console.log(treatment + " " + name);
}
// Questao 3: retornar os numeros de array como string separado por "-"
function returnNumbers(numeros) {
    var result = "";
    numeros.forEach(function (element, index) {
        result += element;
        result += index < numeros.length - 1 ? "-" : ""; // Adiciona hifen se nao for o ultimo elemento
    });
    console.log(result);
    return result;
}
// Questao 4: soma de numeros com parametro opcional
function soma(x, y) {
    return x + y;
}
// Questao 5: funcao exibir strings com rest parameter
function exibir() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    params.forEach(function (param) { return console.log(param); });
}
// Questao 6: funcao ola() como arrow function
var ola = function () { return console.log("Ola"); };
evenOrInteger(23);
returnNumbers([1, 2, 3, 4, 5]);
saludate("Silva", "Mestre");
console.log(soma(1, 2)); // Exibe 3
console.log(soma(1, "2")); // Exibe "12"
console.log(soma(1)); // Exibe NaN
exibir("1", "2", "c");
ola();
// Questao 7: filtragem de arrays usando arrow function
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
array = array.filter(function (n) { return n % 2 == 0; });
console.log(array);
// Questão 8: criar uma array, usar map para dobrar elementos
// e usar reduce para somar elementos
var nossaArray = [1, 3, 5, 8, 9, 10];
var nossaArrayDobrada = nossaArray.map(function (elemento) { return 2 * elemento; });
var somaArray = nossaArray.reduce(function (acc, valor) { return acc + valor; });
console.log("Elementos dobrados: ", nossaArrayDobrada);
console.log("Somatorio do Array: ", somaArray);
