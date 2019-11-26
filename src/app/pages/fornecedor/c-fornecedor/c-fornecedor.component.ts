import { Component, OnInit, ViewChild } from '@angular/core';
import { MainNavComponent } from "src/app/pages/main-nav/main-nav.component";
import { MasterEranca } from 'src/app/masterEranca';
import { Fornecedor } from "src/app/models/fornecedor";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatTable, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';
import { FornecedoresService } from 'src/app/services/fornecedores.service';
import { Produto } from 'src/app/models/produto';

const ELEMENT_DATA: Fornecedor[] = [
  { userId: 1560608796014, fullName: 'Antônio Prado', phone: 98320859 },
  { userId: 1560608787815, fullName: 'Venegere Orlin', phone: 98468598 },
  { userId: 1560608805101, fullName: 'Rolene Santana', phone: 99608554 },
  { userId: 123123123, fullName: 'asd', phone: 11111111 }
];

const ELEMENT_DATAP: Produto[] = [
  { codigo: 1560608796014, name: 'Vestido Preto Transpassado', categoria: 'Moda Pop, Alça Dupla', preco: 39.99, dataRetorno: '22/11/2019' },
  { codigo: 1560608787815, name: 'Vestido Bege', categoria: 'Moda Verão, Bonprix', preco: 79.99, dataRetorno: '13/08/2019' },
  { codigo: 1560608805101, name: 'Vestido Decote Redondo', categoria: 'Moda Evangélica, Estampado, Rosalie', preco: 39.99, dataRetorno: '07/09/2019' }
];

@Component({
  selector: 'app-c-fornecedor',
  templateUrl: './c-fornecedor.component.html',
  styleUrls: ['./c-fornecedor.component.scss']
})
export class CFornecedorComponent extends MasterEranca implements OnInit {
  public isFirstOpen = true;
  public fornecedor: Fornecedor;

  //Table
  displayedColumnsProd: string[] = ['codigo', 'name', 'categoria', 'preco', 'dtFornecida'];
  dataSourceProd = new MatTableDataSource(ELEMENT_DATAP);

  displayedColumnsCad: string[] = ['userId', 'fullName', 'phone', 'action'];
  dataSourceCadastrados = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild('mytableCad', { static: true }) mytableCad: MatTable<any>;

  constructor(
    private componenteMenu: MainNavComponent,
    public dialog: MatDialog,
    private fornecedorService: FornecedoresService
  ) {
    super();
    this.componenteMenu.titleTela = this.SetTitleTela("Cadastro de Fornecedor");
  }

  openDialog(action, obj) {
    obj.action = action;
    debugger;

    if (action == 'Update') {
      this.updateRowData(obj);
    } else if (action == 'Desativar') {
      const dialogRef = this.dialog.open(DialogBoxComponent, {
        width: '300px',
        data: obj
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event === 'Desativar') {
          this.deleteRowData(obj);
        }
      });
    }
  }

  onBlurMethod() {
    debugger;
    if (this.fornecedor.phone.toString().length > 8) this.fornecedor.phone = parseInt(this.fornecedor.phone.toString().slice(1, 9));
  }

  updateRowData(row_obj: Fornecedor) {
    if (row_obj.userId > 0)
      this.fornecedorService.getFornecedorById(row_obj.userId).subscribe(
        (res: any) => {
          if (res) {
            this.fornecedor = res;
          }
        }
      )
  }

  deleteRowData(row_obj) {
    this.dataSourceCadastrados.data = this.dataSourceCadastrados.data.filter((value, key) => {
      return value.userId != row_obj.userId;
    });
    if (row_obj.userId > 0) this.fornecedorService.inativarFornecedor(row_obj.userId);
    this.mytableCad.renderRows();
    this.carregar();
  }

  ngOnInit() {
    this.fornecedorService.getFornecedores().subscribe(res => this.CarregaForm(res as []));

    this.limparFornecedor();
  }

  public CarregaForm(valores: any[]) {
    debugger;
    this.dataSourceCadastrados.data = [];
    this.dataSourceCadastrados.data.push(...valores);
    this.mytableCad.renderRows();
  }

  public limparFornecedor() {
    this.fornecedor = {
      password: null,
      estado: null,
      fullName: null,
      cidade: null,
      cpf: null,
      email: null,
      endereco: null,
      userId: null,
      phone: null,
      userName: null,
    }
  }

  carregar() {
    this.fornecedorService.getFornecedores().subscribe(res => this.CarregaForm(res as any));
  }

  protected salvar() {
    debugger;
    var p: any;
    if (this.fornecedor.userId > 0) {
      this.fornecedorService.getFornecedorById(this.fornecedor.userId).subscribe(
        (res: any) => {
          if (res) {
            if(res.userId) {
              p = {
                userId: this.fornecedor.userId,
                fullName: this.fornecedor.fullName,
                phone: this.fornecedor.phone
              }
              this.fornecedorService.updateFornecedor(res.userId, p).subscribe(res => console.log(res));
              this.carregar();
            } else {
              p = {
                fullName: this.fornecedor.fullName,
                phone: this.fornecedor.phone
              }
              this.fornecedorService.createFornecedor(p).subscribe(res => console.log(res));
              this.carregar();
            }
          }
        }
      );
    } else {
      p = {
        fullName: this.fornecedor.fullName,
        phone: this.fornecedor.phone
      }
      this.fornecedorService.createFornecedor(p).subscribe(res => console.log(res));
      this.carregar();
    }

    
  }
}
