import { Users } from './users';

export interface Fornecedor extends Users {
    phone?: number;
    produtosID?: string;
    vendedorID?: number;
}
