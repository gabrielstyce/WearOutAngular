import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Produto } from "src/app/models/produto";
import { MainService } from "./main.service";
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  verificaUser(email, senha) {
    var p: any = {};
    p = {
      "Email": email,
      "Password": senha
    }

    return this.http.post(environment.apiBaseURL + '/Clientes/Login', p);
  }

  registerUser(email, senha) {
    var p: any = {};
    p = {
      "Email": email,
      "Password": senha
    }

    return this.http.post(environment.apiBaseURL + '/Clientes/Login/Register', p);
  }
}
