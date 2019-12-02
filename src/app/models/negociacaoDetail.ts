import { Vendedor } from './vendedor';
import { Cliente } from './cliente';
import { Produto } from './produto';

export interface NegociacaoRetorno {
    id?: number;
    total?: number;
    dataVenda?: Date;
    dataRetorno?: string;
    vendedor?: Vendedor;
    cliente?: Cliente;
    produtos?: Produto[];
}