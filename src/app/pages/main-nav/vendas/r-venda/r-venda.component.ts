import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { Negociacao } from 'src/app/models/negociacao';
import { datepickerAnimation } from 'ngx-bootstrap/datepicker/datepicker-animations';
import { MainNavComponent } from '../../main-nav.component';
import { MasterEranca } from 'src/app/masterEranca';
import { VendasService } from 'src/app/services/vendas.service';
import { DialogVendasComponent } from 'src/app/components/dialog-vendas/dialog-vendas.component';
import { MatDialog } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

var d = new Date();
console.log(d)
const ELEMENT_DATA: Negociacao[] = [
  { NegociacaoId: 1560608796014, ClienteName: 'Alezanxer Arnold', DataRetorno: d.toLocaleDateString(), ValorTotal: 39.99 , produtos: [{ nome: 'Vestido Preto Transpassado', valor: 39.99}]},
  { NegociacaoId: 1560608805101, ClienteName: 'Azpilicueta', DataRetorno: d.toLocaleDateString(), ValorTotal: 78.99 , produtos: [{ nome: 'Vestido Decote Aberto', valor: 39.99}, { nome: 'Vestido Laranja', valor: 49}]},
  { NegociacaoId: 1560608787815, ClienteName: 'Blind', DataRetorno: d.toLocaleDateString(), ValorTotal: 79.99 , produtos: [{ nome: 'Vestido Bege', valor: 79.99}, ]},
  { NegociacaoId: 1560608805101, ClienteName: 'De Ligt', DataRetorno: d.toLocaleDateString(), ValorTotal: 39.99  , produtos: [{ nome: 'Vestido Decote Redondo', valor: 39.99}]},
  { NegociacaoId: 1560608796014, ClienteName: 'Giménez ', DataRetorno: d.toLocaleDateString(), ValorTotal: 39.99 , produtos: [{ nome: 'Vestido Preto Rosado', valor: 39.99} ]},
  { NegociacaoId: 1560608787815, ClienteName: 'Jordi Alba', DataRetorno: d.toLocaleDateString(), ValorTotal: 79.99 , produtos: [{ nome: 'Vestido Bege C/ listras', valor: 39.99} ]},
];

@Component({
  selector: 'app-r-venda',
  templateUrl: './r-venda.component.html',
  styleUrls: ['./r-venda.component.scss']
})

export class RVendaComponent extends MasterEranca implements OnInit {
  negociacoes: Negociacao[] = [];

  constructor(private componenteMenu: MainNavComponent,
              private vendasService: VendasService,
              private dialog: MatDialog,private cookie: CookieService,
              private route: Router) { 
    super();
    this.componenteMenu.titleTela = this.SetTitleTela("Vendas");
  }

  ngOnInit() {
    this.verificaLogado();
debugger;
    let user: number = parseInt(this.cookie.get('userLogado'));

    this.vendasService.GetVendas(user).subscribe(res => this.CarregaVendas(res as any[]));
  }

  CarregaVendas(Lista: any[]) {
    console.log(Lista);
    this.negociacoes = [];
    Lista.forEach(x => {
      x.DataRetorno = this.GetDataString(x.dataVenda);
    })
    this.negociacoes.push(...Lista);
  }

  openDialog(obj) {
    // obj.action = action;
    obj.DataRetorno = this.GetDataString(obj.dataVenda);
    console.log(obj);
    const dialogRef = this.dialog.open(DialogVendasComponent, {
      width: '450px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.event == 'Atualizar') {
        console.log
      } else if (result.event == 'Desativar') {
        // this.deleteRowData(result.data);
      }
    });
  }

  verificaLogado() {
    if (this.cookie.get('userLogado') == "") {
      this.route.navigate(['/user/login']);
    }
  }

}
