import { Users } from './users';

export interface Vendedor extends Users {
    ProdutosID: string;
    FornecedoresID: string;
}
