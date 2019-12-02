import { Component, OnInit, ViewChild } from '@angular/core';
import { Vendedor } from 'src/app/models/vendedor';
import { MatTableDataSource, MatSort, MatTable, MatPaginator } from '@angular/material';
import { MainNavComponent } from '../../main-nav.component';
import { VendasService } from 'src/app/services/vendas.service';
import { MasterEranca } from 'src/app/masterEranca';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

const ELEMENT_DATA: Vendedor[] = [];

@Component({
  selector: 'app-r-cliente',
  templateUrl: './r-cliente.component.html',
  styleUrls: ['./r-cliente.component.scss']
})
export class RClienteComponent extends MasterEranca implements OnInit {
  vendedor: Vendedor;
  
  dataSource = new MatTableDataSource<Vendedor>(ELEMENT_DATA);
  displayedColumns: string[] = ['fullName', 'email', 'cpf', 'cep', 'estado'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private componenteMenu: MainNavComponent,
    private vendasService: VendasService,
    private cookie: CookieService,
    private route: Router
  ) {
    super();
    this.componenteMenu.titleTela = this.SetTitleTela("Relação de Cliente");
  }

  ngOnInit() { 
this.verificaLogado();

    this.vendasService.GetAllClientes(1).subscribe(res => this.CarregarForm(res as any));
  }

  CarregarForm(valores: any[]) {
    if (valores.length > 0) {
      this.dataSource.data = [];

      valores.forEach(x => {
        if (x.dtFornecida != undefined)
          x.dataRetorno = this.GetDataString(x.dtFornecida);
      });

      this.dataSource.data.push(...valores);
      this.table.renderRows();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verificaLogado() {
    if (this.cookie.get('userLogado') == "") {
      this.route.navigate(['/user/login']);
    }
  }
}
