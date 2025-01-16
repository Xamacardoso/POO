import { Produto } from "./produto";
import { ProdutoPerecivel } from "./produtoPerecivel";

class Estoque {
    private _prods : Produto[] = [];

    /**h. Implemente métodos para inserir, consultar pelo atributo id, excluir, repor e 
dar baixa nos produtos na classe estoque;  
i. Crie validações para não deixar serem incluídos produtos com mesmo id ou 
mesma descrição. Para isso, crie uma consulta adicional através de um 
método existe(id: number, descricao: string): boolean e use-o no método 
incluir.  
j. Os métodos repor e dar baixa na classe estoque chamam os métodos da 
classe produto finalmente alterar a quantidade;  
k. Os vários métodos da classe devem levar em conta se o produto existe, para 
isso, use o método existe ou consultar;  
l. Implemente um método que liste todos os produtos perecíveis vencidos. */

    public inserirProduto(produto: Produto): void {
        if (this.verificarExistencia(produto.id, produto.nome)) {
            this._prods.push(produto);
            return;
        }

        console.log("Produto ja cadastrado");
    }

    public verificarExistencia(id: number, nome: string): boolean {
        return this._prods.some(produto => produto.id === id && produto.nome === nome);
    }

    public consultarProduto(id: number): Produto | undefined {
        for (const produto of this._prods) {
            if (produto.id === id) {
                return produto;
            }
        }
        
        console.log("Produto nao encontrado");
        return undefined;
    }

    public reporProduto(id: number, qtd: number): void {
        const produto = this.consultarProduto(id);
        if (produto) {
            produto.repor(qtd);
        }

    }

    public darBaixaProduto(id: number, qtd: number): void {
        const produto = this.consultarProduto(id);
        if (produto) {
            produto.darBaixa(qtd);
        }
    }

    public listarVencidos(): void {
        for (const produto of this._prods) {
            if (produto instanceof ProdutoPerecivel) {
                if (produto.verificarVencimento()) {
                    console.log(produto.id + " - " + produto.nome + " - Venceu: " + produto.dataValidade);
                }
            }
        }
    }

}