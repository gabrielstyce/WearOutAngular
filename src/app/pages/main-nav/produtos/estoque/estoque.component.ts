import { Component, OnInit, ViewChild } from '@angular/core';
import { MainNavComponent } from '../../main-nav.component';
import { MasterEranca } from 'src/app/masterEranca';
import { Produto } from 'src/app/models/produto';
import { MatTable, MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ProdutosService } from 'src/app/services/produtos.service';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

const ELEMENT_DATA: Produto[] = [
  { codigo: 1560608796014, name: 'Vestido Preto Transpassado', categoria: 'Moda Pop, Alça Dupla', preco: 39.99 },
  { codigo: 1560608787815, name: 'Vestido Bege', categoria: 'Moda Verão, Bonprix', preco: 79.99 },
  { codigo: 1560608805101, name: 'Vestido Decote Redondo', categoria: 'Moda Evangélica, Estampado, Rosalie', preco: 39.99 }
];

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent extends MasterEranca implements OnInit {
  produto: Produto;
  isFirstOpen = true;

  //Table
  dataSource = new MatTableDataSource<Produto>(ELEMENT_DATA);
  displayedColumns: string[] = ['codigo', 'name', 'categoria', 'qtdFornecida', 'preco', 'dtFornecida', 'action']; // Menus a serem apresentados

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private componenteMenu: MainNavComponent,
    private produtoService: ProdutosService,
    private dialog: MatDialog,
    private cookie: CookieService,
    private route: Router
  ) {
    super();
    this.componenteMenu.titleTela = this.SetTitleTela("Estoque");
  }

  ngOnInit() {
    //Retorna todos os produtos do DB
    this.verificaLogado()

    this.produtoService.getProdutos().subscribe((res: any) => {
      this.CarregarForm(res);
    });
    
  }

  verificaLogado() {
    if (this.cookie.get('userLogado') == "") {
      this.route.navigate(['/user/login']);
    }
  }
  
  CarregarForm(valores: any[]) {
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

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '350px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Atualizar') {
        this.updateRowData(result.data);
      } else if (result.event == 'Desativar') {
        this.deleteRowData(result.data);
      }
    });
  }

  updateRowData(row_obj) {
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      if (value.codigo == row_obj.codigo) {
        if (value.produtoId == row_obj.produtoId) {
          if (value.produtoId > 0) {
            let p: any = {};
            let d = new Date();

            this.produtoService.getProdutoById(value.produtoId).subscribe(
              (res: any) => {
                if (res) {
                  if (res.produtoId) {

                    p = {
                      "produtoId": res.produtoId,
                      "codigo": res.codigo,
                      "name": row_obj.name,
                      "descricao": res.descricao,
                      "categoria": res.categoria,
                      "preco": row_obj.preco,
                      "qtdProduto": res.qtdProduto,
                      "idEstoque": res.idEstoque,
                      "nomeEstoque": res.nomeEstoque,
                      "qtdFornecida": row_obj.qtdFornecida,
                      "dtFornecida": d,
                      "vendedorID": res.vendedorID,
                      "fornecedorID": res.fornecedorID
                    }

                    this.produtoService.updateProduto(p.produtoId, p).subscribe((res: any) => {
                      console.log(res);
                      this.produtoService.getProdutos().subscribe(res => this.CarregarForm(res as any));
                    });
                  }
                }
              });
          }
        }
      }
      return true;
    });
  }

  deleteRowData(row_obj) {
    if (row_obj.produtoId > 0) {
      this.produtoService
        .inativarProduto(row_obj.produtoId)
        .subscribe(res => console.log(res));

      this.produtoService.getProdutos().subscribe((res: any) => {
        this.CarregarForm(res);
      });

      this.table.renderRows();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
