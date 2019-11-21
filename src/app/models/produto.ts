export interface Produto {
    produtoId?: number;
    codigo?: number;
    name?: string;
    descricao?: string;
    categoria?: string;
    preco?: number;
    qtdProduto?: number;
    idEstoque?: number;
    nomeEstoque?: string;
    qtdFornecida?: number;
    dtFornecida?: Date;
    vendedorID?: number;
    fornecedorID?: number;
}
