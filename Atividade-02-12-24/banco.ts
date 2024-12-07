import { Cliente } from "./cliente";
import { Conta } from "./conta";


export class Banco {
    clientes: Cliente[];
    contas: Conta[];
    private proximoIdConta: number = 1;
    private proximoIdCliente: number = 1;
    
    constructor() {
        this.contas = [];
        this.clientes = [];
    }


    inserirConta(num: string): void {
        let novoId: number;

        for (let c of this.contas){
            if (c.numero === num){
                console.log("Já existe uma conta com esse numero!!!");
                return;
            }
        }

        do {
            novoId = this.proximoIdConta++;
        } while (this.consultarConta(novoId.toString()) !== undefined);

        let novaConta: Conta = new Conta(novoId, num, 0);
        console.log(`A conta ${novaConta.numero} foi criada com sucesso.`);
        this.contas.push(novaConta);
    }

    inserirCliente(cliente: Cliente): void{
        let novoIdCliente: number;

        for(let c of this.clientes){
            if (c.id === cliente.id || c.cpf === cliente.cpf){
                console.error("Já existe um cliente com esse ID ou CPF!!");
                return;
            }
        }

        do {
            novoIdCliente = this.proximoIdCliente++;
        } while (this.consultarCliente(cliente.cpf) !== undefined);
        
        cliente.id = novoIdCliente;
        this.clientes.push(cliente);
        console.log(`O cliente ${cliente.nome} foi adicionado com sucesso.`);
    }

    consultarConta(numero: string): Conta {
        let contaProcurada!: Conta;

        for (let conta of this.contas) {
            if (conta.numero == numero) {
                contaProcurada = conta;
                break;
            }
        }

        return contaProcurada;
    }

    consultarCliente(cpf: string): Cliente {
        let clienteDesejado!: Cliente;
        for (let cliente of this.clientes){
            if (cliente.cpf === cpf){
                clienteDesejado = cliente;
                break; 
            }
        }

        return clienteDesejado;
    }

    /*c) Associar um cliente a uma conta
    • Método: associarContaCliente(numeroConta: string, cpfCliente:
    string): void
    • Procure o cliente e a conta com os dados fornecidos e associe-os,
    respeitando considernado que o cliente não pode ter a mesma conta
    adicionada mais de uma vez. */

    associarContaCliente(numeroConta: string, cpfCliente: string) : void{
        let conta: Conta = this.consultarConta(numeroConta);
        let cliente: Cliente = this.consultarCliente(cpfCliente);

        if (!conta || !cliente){
            console.error("Cliente ou conta não encontrados");
            return;
        }

        if (conta.dono){
            console.error("Essa conta já está associada a um cliente!!");
            return;
        }

        
        cliente.adicionarConta(conta);
        conta.dono = cliente;
        console.log(`Conta ${conta.numero} foi associada ao cliente ${conta.dono.nome}`);
    }

    /*d) Listar contas de um cliente
    • Método: listarContasCliente(cpf: string): Conta[]
    • Retorne todas as contas associadas ao cliente cujo CPF foi
    informado.*/

    listarContasCliente(cpf: string): Conta[] {
        let cliente = this.consultarCliente(cpf);

        if (!cliente){
            console.error("Cliente não encontrado!");
            return [];
        }

        return this.contas.filter(conta => conta.dono.cpf === cliente.cpf);
    }

    /*e) Totalizar saldo por cliente
    • Método: totalizarSaldoCliente(cpf: string): number
    • Calcule e retorne o saldo total de todas as contas de um cliente.
    */

    totalizarSaldoCliente(cpf: string): number | undefined {
        let cliente = this.consultarCliente(cpf);
        
        if (!cliente){
            console.error("Cliente não encontrado!!");
            return;
        }
        let soma: number = 0;
        for (let contaCliente of cliente.listarContas()){
            soma += contaCliente.consultarSaldo();
        }
        return soma;
        
    }

    depositar(numero: string, valor: number): void {
        let contaProcurada: Conta = this.consultarConta(numero);
        if (!contaProcurada){
            console.error("Conta nao encontrada!");
            return;
        }

        contaProcurada.depositar(valor);
    }

    consultarIndice(numeroConta: string): number{
        let indiceProcurado = -1;
        for (let i = 0; i < this.contas.length; i++){
            if (this.contas[i].numero === numeroConta){
                indiceProcurado = i;
                break;
            }
            
        }

        return indiceProcurado;
    }

    excluirConta(numeroConta: string): void{
        let indice = this.consultarIndice(numeroConta);
        if (indice === -1){
            console.error("Conta nao encontrada!");
            return;
        }

        for (let i = indice; i < this.contas.length; i++){
            this.contas[i] = this.contas[i + 1];
        }
        this.contas.pop();
    }

    atualizaConta(novaConta: Conta): void {
        let indice = this.consultarIndice(novaConta.numero);
        if (indice === -1){
            console.error("Conta nao encontrada!");
            return;
        }

        novaConta.id = this.contas[indice].id;
        this.contas[indice] = novaConta;
    }

    //sacar,depositar e transferir
    sacar(numConta: string, valor: number): void{
        let contaProcurada: Conta = this.consultarConta(numConta);

        if (!contaProcurada){
            console.error("Conta nao encontrada!");
            return;
        }

        contaProcurada.sacar(valor);
        console.log(`Saque de R$ ${valor.toFixed(2)} da conta ${contaProcurada.numero} realizado com sucesso`);
    }

    transferir(contaOrigem: string, contaDestino: string, valor: number): void{
        let contaOrigemProc: Conta = this.consultarConta(contaOrigem);
        let contaDestinoProc: Conta = this.consultarConta(contaDestino);

        if (!contaOrigemProc || !contaDestinoProc){
            console.error("Conta de origem ou destino nao encontrada!");
            return;
        }

        contaOrigemProc.transferir(contaDestinoProc, valor);
        console.log(`Transferencia de ${contaOrigemProc.numero} para ${contaDestinoProc.numero} realizada com sucesso`);   
    }

    contarContas(): number{
        return this.contas.length;
    }

    somatorioContas(): number{
        return this.contas.reduce((total, conta) => total + conta.saldo, 0);
    }

    mediaContas(): number{
        return this.somatorioContas() / this.contarContas();
    }

    transferirArrayContas(numContaOrigem: string, valor: number,...arrayNumContas: string[]): void{
        let contaOrigem: Conta = this.consultarConta(numContaOrigem);

        if (!contaOrigem){
            console.error("Conta origem não encontrada!");
            return;
        }

        for (let numConta of arrayNumContas){
            let conta: Conta = this.consultarConta(numConta);
            if (!conta){
                console.log(`Conta de numero ${numConta} não encontrada...`);
                continue;
            }

            this.transferir(contaOrigem.numero, conta.numero, valor);
            console.log(`A conta ${numContaOrigem} transferiu R$ ${valor.toFixed(2)} para a conta ${numConta}`);
            
        }
    }
}
export { Cliente };
export { Conta };

