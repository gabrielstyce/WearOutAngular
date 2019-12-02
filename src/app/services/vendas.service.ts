import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from "./main.service";


@Injectable({
  providedIn: 'root'
})
export class VendasService {
  service: string = '/Vendedors';

  constructor(private http: HttpClient,
    private call: MainService) {

  }

  public GetAllClientes(id: number) { // Retorna todos os clientes do vendedor
    if (id > 0) return this.call.getByIdGeneric('/Vendedors' + '/Cliente', id);
  }

  public GetVendas(id?: number) {
    if (id > 0) return this.call.getByIdGeneric('/Negociacaos' + '/Vendedor', id);
    else return this.call.getByIdGeneric('/Negociacaos' + '/Vendedor', 1);
  }
}
