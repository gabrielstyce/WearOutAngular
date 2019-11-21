import { Component, OnInit, ViewChild } from '@angular/core';
import { MainNavComponent } from "src/app/pages/main-nav/main-nav.component";
import { MasterEranca } from 'src/app/masterEranca';
import { Produto } from "src/app/models/produto";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatTable, MatTableDataSource } from '@angular/material';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';
import { ProdutosService } from 'src/app/services/produtos.service';
import { DataSource } from '@angular/cdk/table';
import { Fornecedor } from 'src/app/models/fornecedor';



export interface UsersData {
  name: string;
  id: number;
}

const ELEMENT_DATA: Produto[] = [
  { codigo: 1560608769632, name: 'Macaquinho Transpassado', categoria: 'Moda Pop, Listrado com Alças', preco: 39.99 },
  { codigo: 1560608796014, name: 'Vestido Preto Transpassado', categoria: 'Moda Pop, Alça Dupla', preco: 39.99 },
  { codigo: 1560608787815, name: 'Vestido Bege', categoria: 'Moda Verão, Bonprix', preco: 79.99 },
  { codigo: 1560608805101, name: 'Vestido Decote Redondo', categoria: 'Moda Evangélica, Estampado, Rosalie', preco: 39.99 }
];

@Component({
  selector: 'app-c-produto',
  templateUrl: './c-produto.component.html',
  styleUrls: ['./c-produto.component.scss']
})

export class CProdutoComponent extends MasterEranca implements OnInit {
  produto: Produto; //Entidade da tela
  fornecedor: Fornecedor;
  isFirstOpen = true;

  // // Table
  // displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = ELEMENT_DATA;
  bsConfig: Partial<BsDatepickerConfig>;
  displayedColumns: string[] = ['codigo', 'name', 'categoria', 'preco', 'action']; // Menus a serem apresentados //,  'dtFornecida'
  //                               //*A order das colunas é a mesma do apresentada no array

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    private dialog: MatDialog,
    private produtoService: ProdutosService,
    private componenteMenu: MainNavComponent,
  ) {
    super();
    this.componenteMenu.titleTela = this.SetTitleTela("Cadastro de Produto");
  }

  ngOnInit() {
    this.limparProduto();
    this.componenteMenu.SetTitleTela("Cadastro de Produto");
    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue', isAnimated: true }); //Config do datePicker

    this.produtoService.getProdutos().subscribe(res => this.CarregaForm(res as any[])); // Pega todos os produtos do banco

  }

  CarregaForm(valores: any[]) {
    this.dataSource.push(...valores);
    this.table.renderRows();
  }

  test() {
    console.log(this.produto.produtoId);
    if (this.produto) {
      if (this.produto.produtoId) {
        if (this.produto.produtoId.toString().length > 0 && this.produto.produtoId > 0) {
          this.produtoService.getProdutoById(this.produto.produtoId).subscribe(res => this.carregarRetorno(res));
        }
      }
    }
  }

  carregarRetorno(valor: any) {
    console.log(valor);
    if (valor) {
      this.produto = valor;
    } else {
      alert('Produto não encontrado.')
      this.limparProduto();
    }

  }

  salvar() {
    console.log(this.produto);
    if (this.produto.name == null) {
      alert('Um ou mais campos não estão preenchidos');
    } else {
      this.PrepararCadastro(this.produto, false);
      this.dataSource.push(...[this.produto]);
      this.table.renderRows();
      alert(`Produto: ${this.produto.name} foi salvo com sucesso`);
    }
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: UsersData) {
    var d = new Date();
    // row_obj.dtFornecida = d;
    this.dataSource.push(row_obj);
    this.table.renderRows();
  }

  updateRowData(row_obj: Produto) {
    let d = new Date();
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.produtoId == row_obj.produtoId && value.codigo == row_obj.codigo) {
        console.log(key);
        value = {
          produtoId: row_obj.produtoId,
          name: row_obj.name,
          preco: row_obj.preco,
          categoria: row_obj.categoria,
          descricao: row_obj.descricao,
          dtFornecida: d,
          fornecedorID: row_obj.fornecedorID,
          idEstoque: row_obj.idEstoque,
          nomeEstoque: row_obj.nomeEstoque,
          qtdFornecida: row_obj.qtdFornecida,
          qtdProduto: row_obj.qtdProduto,
          vendedorID: row_obj.vendedorID,
        }

        return true;
      }

      return false
    });
  }

  deleteRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.produtoId != row_obj.produtoId;
    });
    this.table.renderRows();
  }

  public limparProduto() {
    var d = new Date();
    this.produto = {
      codigo: null,
      name: null,
      preco: null,
      categoria: null,
      descricao: null,
      dtFornecida: d,
      fornecedorID: null,
      idEstoque: null,
      produtoId: null,
      nomeEstoque: null,
      qtdFornecida: null,
      qtdProduto: null,
      vendedorID: null,
    }

    this.fornecedor = {
      cep: null,
      cidade: null,
      cpf: null,
      email: null,
      endereco: null,
      estado: null,
      fullName: null,
      id: null,
      password: null,
      phone: null,
      produtosID: null,
      tipo: null,
      userName: null,
      vendedorID: null

    }
  }

  public PrepararCadastro(item: Produto, delet?: any) {
    let p: any = {};
    let d = new Date();

    (item.categoria == null) ? item.categoria = '' : item.categoria = item.categoria;
    (item.descricao == null) ? item.descricao = '' : item.descricao = item.descricao;
    (item.dtFornecida == null) ? item.dtFornecida = d : item.dtFornecida = item.dtFornecida;
    (item.fornecedorID == null) ? item.fornecedorID = 0 : item.fornecedorID = item.fornecedorID;
    (item.idEstoque == null) ? item.idEstoque = 0 : item.idEstoque = item.idEstoque;
    (item.name == null) ? item.name = '' : item.name = item.name;
    (item.preco == null) ? item.preco = 0 : item.preco = item.preco;
    (item.codigo == null) ? item.codigo = 0 : item.codigo = item.codigo;
    (item.qtdFornecida == null) ? item.qtdFornecida = 0 : item.qtdFornecida = item.qtdFornecida;
    (item.qtdProduto == null) ? item.qtdProduto = 0 : item.qtdProduto = item.qtdProduto;
    (item.vendedorID == null) ? item.vendedorID = 0 : item.vendedorID = item.vendedorID;

    if (item.produtoId > 0 && !delet) {
      p = {
        "produtoId": item.produtoId,
        "codigo": item.codigo,
        "name": item.name,
        "descricao": item.descricao,
        "categoria": item.categoria,
        "preco": item.preco,
        "qtdProduto": item.qtdFornecida,
        "idEstoque": item.idEstoque,
        "nomeEstoque": item.nomeEstoque,
        "qtdFornecida": item.qtdFornecida,
        "dtFornecida": item.dtFornecida,
        "vendedorID": item.vendedorID,
        "fornecedorID": item.fornecedorID
      }

      this.produtoService.updateProduto(item.produtoId, item);
    } else if (delet) {

      p = {
        "codigo": item.codigo,
        "name": item.name,
        "descricao": item.descricao,
        "categoria": item.categoria,
        "preco": item.preco,
        "qtdProduto": item.qtdFornecida,
        "idEstoque": item.idEstoque,
        "nomeEstoque": item.nomeEstoque,
        "qtdFornecida": item.qtdFornecida,
        "dtFornecida": item.dtFornecida,
        "vendedorID": item.vendedorID,
        "fornecedorID": item.fornecedorID
      }

      this.produtoService.updateProduto(item.produtoId, item);
    } else {

      p = {
        "codigo": item.codigo,
        "name": item.name,
        "descricao": item.descricao,
        "preco": item.preco,
        "qtdProduto": item.qtdFornecida,
        "idEstoque": item.idEstoque,
        "nomeEstoque": item.nomeEstoque,
        "qtdFornecida": item.qtdFornecida,
        "vendedorID": item.vendedorID,
        "dtFornecida": item.dtFornecida,
        "categoria": item.categoria,
        "fornecedorID": item.fornecedorID
      }

      if (!delet) this.produtoService.createProduto(p).subscribe(res => console.log(res));
    }
  }
}
