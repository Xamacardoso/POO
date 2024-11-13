// Questao 1: funcao par ou impar
function evenOrInteger(n: number): boolean {
    console.log(`${n} eh ${n % 2 ? "impar" : "par"}`);
    return n % 2 == 0;
}


// Questao 2: saudacao com parametro
function saludate(name: string, treatment: string = "Sr."): void {
    console.log(treatment + " " + name);
}


// Questao 3: retornar os numeros de array como string separado por "-"
function returnNumbers(numeros:number[]){
    let result = "";

    numeros.forEach((element, index) => {
        result += element;
        result += index < numeros.length-1 ? "-" : ""; // Adiciona hifen se nao for o ultimo elemento
    });

    console.log(result);
    return result;
}


// Questao 4: soma de numeros com parametro opcional
function soma(x: number, y?: any): number {
    return x + y
}


// Questao 5: funcao exibir strings com rest parameter
function exibir(...params: string[]): void{
    params.forEach((param) => console.log(param));
}

// Questao 6: funcao ola() como arrow function
var ola: Function = () => console.log("Ola");

evenOrInteger(23);
returnNumbers([1,2,3,4,5]);
saludate("Silva", "Mestre");

console.log(soma(1,2)); // Exibe 3
console.log(soma(1,"2")); // Exibe "12"
console.log(soma(1)); // Exibe NaN

exibir("1","2","c");
ola();

// Questao 7: filtragem de arrays usando arrow function
let array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

array = array.filter((n) => n % 2 == 0);
console.log(array);

// Questão 8: criar uma array, usar map para dobrar elementos
// e usar reduce para somar elementos
let nossaArray: number[] = [1,3,5,8,9,10];
let nossaArrayDobrada: number[] = nossaArray.map((elemento) => 2 * elemento);
let somaArray: number = nossaArray.reduce((acc, valor) => acc+valor);

console.log("Elementos dobrados: ", nossaArrayDobrada);
console.log("Somatorio do Array: ",somaArray);
