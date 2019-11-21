import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

// Classe genérica de comunicação com a api
export class MainService {
  url: string = environment.apiBaseURL;

  constructor(private http: HttpClient) { }

  getAllGeneric(service) {
    try {
      return this.http.get(this.url + service);
    } catch (error) {
      this.LogarErro(service, error);
    }
  }

  getByIdGeneric(service, id) {
    try {
      return this.http.get(this.url + service + '/' + id);
    } catch (error) {
      this.LogarErro(`(getBy${service}) c/ o serviço [${service}]`, error);
    }
  }

  updateGeneric(service, id, entity) {
    if (id > 0)
      return this.http.put(this.url + service + '/' + id, entity);
    else
      this.LogarErro(`(update ${service})`, `Campo ID do ${service} não encontrado`);
  }

  createGeneric(service, entity) {
    try {
      return this.http.post(this.url + service, entity);
    } catch (error) {
      this.LogarErro(`(create ${service})`, `Campo ID do ${service} não encontrado`);
    }
  }

  LogarErro(comando: string, erro: any) {
    alert(`Erro ao tentar executar o comando ${comando}; Erro: ${erro}`);
  }
}
