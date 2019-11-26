import { Component, OnInit, ViewChild } from '@angular/core';
import { MainNavComponent } from "src/app/pages/main-nav/main-nav.component";
import { MasterEranca } from 'src/app/masterEranca';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { MatDialog, MatTable, MatPaginator, MatTableDataSource } from '@angular/material';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';
import { Produto } from "src/app/models/produto";
import { Fornecedor } from 'src/app/models/fornecedor';
import { ProdutosService } from 'src/app/services/produtos.service';
import { FornecedoresService } from "src/app/services/fornecedores.service";

const ELEMENT_DATA: Produto[] = [
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

  //Table
  displayedColumns: string[] = ['codigo', 'name', 'categoria', 'preco', 'dtFornecida', 'action']; // Menus a serem apresentados //,  'dtFornecida'
  dataSource = new MatTableDataSource<Produto>(ELEMENT_DATA);
  bsConfig: Partial<BsDatepickerConfig>;

  //*A order das colunas é a mesma do apresentada no array

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private produtoService: ProdutosService,
    private fornecedorService: FornecedoresService,
    private componenteMenu: MainNavComponent,
  ) {
    super();
    this.componenteMenu.titleTela = this.SetTitleTela("Cadastro de Produto");
  }

  ngOnInit() {
    
    this.limparProduto();

    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue', isAnimated: true }); //Config do datePicker

    this.produtoService.getProdutos().subscribe(res => this.CarregaForm(res as any[])); // Pega todos os produtos do banco

  }

  CarregaForm(valores: any[]) {
    this.dataSource.data = [];

    valores.forEach(x => {
      if (x.dtFornecida != undefined)
        x.dataRetorno = this.GetDataString(x.dtFornecida);
    });

    this.dataSource.data.push(...valores);
    this.table.renderRows();
    this.dataSource.paginator = this.paginator;
  }

  BuscarProdutoId() {
    console.log(this.produto.produtoId);
    if (this.produto) {
      if (this.produto.produtoId) {
        if (this.produto.produtoId.toString().length > 0 && this.produto.produtoId > 0) {
          this.produtoService.getProdutoById(this.produto.produtoId).subscribe(res => {
            this.carregarRetorno(res);
          });
        }
      }
    }
  }

  BuscarFornecedorId() {
    debugger;
    if (this.produto.fornecedorID > 0) {
      this.fornecedorService.getFornecedorById(this.produto.fornecedorID).subscribe((res: any) => {
        if (!res) alert('Fornecedor não encontrado');
        else this.fornecedor.fullName = res.fullName;
      });
    }
  }

  BuscarEstoqueId() {
    debugger;
    if (this.produto.idEstoque > 0) {
      this.produtoService.getNomeEstoque(this.produto.idEstoque).subscribe((res: any) => {
        if (!res) alert('Estoque não encontrado');
        else this.produto.nomeEstoque = res.nomeEstoque;
      });
    }
  }

  carregarRetorno(valor: any) {
    console.log(valor);
    if (valor) {
      var data = new Date(valor.dtFornecida);
      this.produto = valor;
      this.produto.dtFornecida = data;
      this.BuscarEstoqueId();
      this.BuscarFornecedorId();
    } else {
      alert('Produto não encontrado.')
      this.limparProduto();
    }
  }

  salvar() {
    debugger;
    console.log(this.produto);
    if (this.produto.name == null) {
      alert('Um ou mais campos não estão preenchidos');
    } else {
      this.PrepararCadastro(this.produto);
      // this.dataSource.push(...[this.produto]);
      this.table.renderRows();
      alert(`Produto: ${this.produto.name} foi salvo com sucesso`);
    }
  }

  openDialog(action, obj) {
    debugger;
    obj.action = action;
    this.produto = obj;
    if (action == 'Update') {
      this.produto.produtoId = obj.produtoId;
      this.BuscarProdutoId();
      this.gotoTop();
    } else if (action == 'Desativar') {
      const dialogRef = this.dialog.open(DialogBoxComponent, {
        width: '300px',
        data: obj
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'Desativar') {
          this.deleteRowData(result.data);
          this.limparProduto();
        }
      });
    }
  }

  deleteRowData(row_obj) {
    if (row_obj.produtoId > 0) {
      this.produtoService.inativarProduto(row_obj.produtoId).subscribe(res => console.log(res));
      this.dataSource.data = this.dataSource.data.filter((value, key) => {
        return value.produtoId != row_obj.produtoId;
      });

      this.table.renderRows();
    }
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
      userId: null,
      password: null,
      phone: null,
      produtosID: null,
      tipo: null,
      userName: null,
      vendedorID: null

    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  public PrepararCadastro(item: Produto) {
    debugger;
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
    (item.urlImage == null) ? item.urlImage = 'https://i.imgur.com/eKIuG6P.png' : item.vendedorID = item.vendedorID;

    p = {
      "codigo": item.codigo,
      "name": item.name,
      "descricao": item.descricao,
      "categoria": item.categoria,
      "preco": item.preco,
      "qtdProduto": item.qtdProduto,
      "idEstoque": item.idEstoque,
      "nomeEstoque": item.nomeEstoque,
      "qtdFornecida": item.qtdFornecida,
      "dtFornecida": item.dtFornecida,
      "vendedorID": item.vendedorID,
      "fornecedorID": item.fornecedorID,
      "urlImage": item.urlImage,
    }

    if (item.produtoId > 0) {
      debugger;
      this.produtoService.getProdutoById(item.produtoId).subscribe(
        (res: any) => {
          if (res) {
            if (res.produtoId) {
              p.produtoId = res.produtoId;
              this.produtoService.updateProduto(p.produtoId, p).subscribe((res: any) => {
                if (p)
                  this.dataSource.data = this.dataSource.data.filter((value, key) => {
                    if (value.codigo == p.codigo) {
                      value = {
                        codigo: value.codigo,
                        produtoId: p.produtoId,
                        name: p.name,
                        preco: p.preco,
                        categoria: p.categoria,
                        descricao: p.descricao,
                        dtFornecida: d,
                        fornecedorID: p.fornecedorID,
                        idEstoque: p.idEstoque,
                        nomeEstoque: p.nomeEstoque,
                        qtdFornecida: p.qtdFornecida,
                        qtdProduto: p.qtdProduto,
                        vendedorID: p.vendedorID,
                      }
                    }
                    return true;
                  });

                this.produtoService.getProdutos().subscribe(res => this.CarregaForm(res as any));
              });
            }
          } else {
            this.produtoService.createProduto(p).subscribe(res => console.log(res));
          }
        });
    } else {
      this.produtoService.createProduto(p).subscribe(res => console.log(res));
    }
  }
}
