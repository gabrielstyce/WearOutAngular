export interface Negociacao {
    NegociacaoId?: number;
    DtNegociacao?: Date;
    ValorTotal?: number;
    ClienteID?: number;
    VendedorID?: number;
    ProdutosID?: string;
    ClienteName?: string;
    produtos?: any[];
    DataRetorno: string;
}
