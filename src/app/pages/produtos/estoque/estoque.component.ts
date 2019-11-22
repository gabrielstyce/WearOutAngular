import { Component, OnInit, ViewChild } from '@angular/core';
import { MainNavComponent } from '../../main-nav/main-nav.component';
import { MasterEranca } from 'src/app/masterEranca';
import { Produto } from 'src/app/models/produto';
import { MatTable, MatDialog } from '@angular/material';
import { ProdutosService } from 'src/app/services/produtos.service';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';

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
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['codigo', 'name', 'categoria', 'qtdFornecida', 'preco', 'dtFornecida', 'action']; // Menus a serem apresentados

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    private componenteMenu: MainNavComponent,
    private produtoService: ProdutosService,
    private dialog: MatDialog,
  ) {
    super();
    this.componenteMenu.titleTela = this.SetTitleTela("Estoque");
  }

  ngOnInit() {
    //Retorna todos os produtos do DB
    this.produtoService.getProdutos().subscribe((res: any) => {
      this.CarregarForm(res);
    });
  }

  CarregarForm(valores: any[]) {
    this.dataSource = [];

    valores.forEach(x => {
      if (x.dtFornecida != undefined)
        x.dataRetorno = this.GetDataString(x.dtFornecida);
    });

    this.dataSource.push(...valores);
    this.table.renderRows();
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '350px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  updateRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
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
}
