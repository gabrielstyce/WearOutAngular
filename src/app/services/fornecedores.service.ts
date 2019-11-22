import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Fornecedor } from "src/app/models/fornecedor";
import { MainService } from "./main.service";
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {
  service: string = '/Fornecedors';

  constructor(private http: HttpClient,
    private call: MainService) {

  }

  getFornecedores() {
    // return this.http.get(environment.apiBaseURL + this.service);
    return this.call.getAllGeneric(this.service);
  }

  getFornecedorById(id: number) {
    return this.call.getByIdGeneric(this.service, id);
  }

  createFornecedor(fornecedor) {
    debugger;
    return this.call.createGeneric(this.service, fornecedor);
  }

  updateFornecedor(id: number, fornecedor: Fornecedor) {
    if (id > 0)
      return this.call.updateGeneric(this.service, id, fornecedor);
      
    return null;
  }

  inativarFornecedor(id: number) {
    if (id > 0)
      return this.call.deleteGeneric(this.service, id);
  }

}
