import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Produto } from "src/app/models/produto";
import { MainService } from "./main.service";

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  service: string = '/Produtos';
  entity: Produto;
  listaEntity: Produto[];

  constructor(private http: HttpClient,
    private call: MainService) {

  }

  getProdutos() {
    // return this.http.get(environment.apiBaseURL + this.service);
    return this.call.getAllGeneric(this.service);
  }

  getProdutoById(id: number) {
    return this.call.getByIdGeneric(this.service, id);
  }

  createProduto(produto) {
    return this.call.createGeneric(this.service, produto);
  }


  updateProduto(id: number, produto: Produto) {
    produto.codigo = 0;
    if (id > 0)
      return this.call.updateGeneric(this.service, id, produto);


    return null;
  }

  inativarProduto(id: number, produto: Produto) {
    produto.codigo = 0;
    if (id > 0)
      return this.call.updateGeneric(this.service, id, produto);
  }


}
