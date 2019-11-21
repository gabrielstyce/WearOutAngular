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

export interface UsersData {
  estado: string;
  id: number;
}
@Component({
  selector: 'app-c-fornecedor',
  templateUrl: './c-fornecedor.component.html',
  styleUrls: ['./c-fornecedor.component.scss']
})
export class CFornecedorComponent extends MasterEranca implements OnInit {
  // public isFirstOpen = true;
  // public nomeButton = "Gravar";
  // public fornecedor: Fornecedor;

  // // Table
  // myForm: FormGroup;
  // colorTheme = 'theme-blue';
  // displayedColumns: string[] = ['.password', '.estado', '.fullName', 'categoria', '.cpf', 'action'];
  // protudoList: Fornecedor[]
  // dataSource = new MatTableDataSource(this.protudoList);
  // bsConfig: Partial<BsDatepickerConfig>;
  // prod;

  // @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    // private componenteMenu: MainNavComponent,
    // public dialog: MatDialog,
    // private fornecedorService: FornecedoresService
  ) {
    super();
    // this.componenteMenu.titleTela = this.SetTitleTela("Cadastro de Fornecedor");
  }

  // openDialog(action, obj) {
  //   obj.action = action;
  //   const dialogRef = this.dialog.open(DialogBoxComponent, {
  //     width: '300px',
  //     data: obj
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result.event == 'Add') {
  //       this.addRowData(result.data);
  //     } else if (result.event == 'Update') {
  //       this.updateRowData(result.data);
  //     } else if (result.event == 'Delete') {
  //       this.deleteRowData(result.data);
  //     }
  //   });
  // }

  // addRowData(row_obj: Fornecedor) {
  //   var d = new Date();
  //   this.dataSource.data.push(row_obj);
  //   this.table.renderRows();
  // }

  // updateRowData(row_obj: Fornecedor) {
  //   let d = new Date();
  //   this.dataSource.data = this.dataSource.data.filter((value, key) => {
  //     // if (value.password == row_obj.password && value.id == row_obj.id) {
  //     //   value.estado = row_obj.estado
  //     //   value.fullName = row_obj.fullName
  //     //   value.categoria = row_obj.categoria
  //     //   value.cidade = row_obj.cidade
  //     //   value.cpf = d
  //     //   value.email = row_obj.email
  //     //   value.endereco = row_obj.endereco
  //     //   value.nomeEstoque = row_obj.nomeEstoque
  //     //   value.phone = row_obj.phone
  //     //   value.fornecedorsID = row_obj.fornecedorsID
  //     //   value.userName = row_obj.userName
  //     // }
  //     return true;
  //   });
  // }
  // deleteRowData(row_obj) {
  //   this.dataSource.data = this.dataSource.data.filter((value, key) => {
  //     // return value.password != row_obj.password;
  //   });
  //   this.table.renderRows();
  // }

  ngOnInit() {
    // this.componenteMenu.SetTitleTela("Cadastro de Fornecedor");
    // this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue', isAnimated: true });

    // this.myForm = new FormGroup({
    //   id: new FormControl(''),
    //   password: new FormControl(''),
    //   estado: new FormControl(''),
    //   cidade: new FormControl(''),
    //   categoria: new FormControl(''),
    //   fullName: new FormControl(''),
    //   fornecedorsID: new FormControl(''),
    //   endereco: new FormControl(''),
    //   nomeEstoque: new FormControl(''),
    //   phone: new FormControl(''),
    //   cpf: new FormControl(''),
    //   userName: new FormControl(''),
    //   email: new FormControl(''),
    //   nomeFornecedor: new FormControl(''),
    // });

    // this.fornecedorService.getFornecedors().subscribe(res => this.CarregaForm(res as []));

    // this.limparFornecedor();
    // console.log(this.protudoList);
  }

  // protected gravar() {

  //   console.log("Gravado");
  // }

  // public CarregaForm(valores: []) {
  //   this.dataSource.data.push(...valores);
  //   this.table.renderRows();
  // }

  // onSubmit() {
  //   // if (this.fornecedor.estado == null) alert("Um ou mais campos não estão preenchidos");

  //   console.log(this.fornecedor);
  //   this.PrepararCadastro(this.fornecedor, false);
  //   // var lista: any = {};
  //   // lista = this.myForm.value;
    // console.log(this.fornecedor);

    // this.fornecedor = {
    //   .password: lista.password,
    //   .estado: lista.estado,
    //   .fullName: lista.fullName,
    //   categoria: lista.categoria,
    //   .cidade: lista.cidade,
    //   .cpf: lista.cpf,
    //   .email: lista.email,
    //   .endereco: lista.endereco,
    //   .id: lista.id,
    //   nomeEstoque: lista.nomeEstoque,
    //   .phone: lista.phone,
    //   .fornecedorsID: lista.fornecedorsID,
    //   .userName: lista.userName,
    // }

    // this.dataSource.data.push(this.fornecedor);

    // console.log(this.dataSource);
  // }

  // public limparFornecedor() {
  //   this.fornecedor = {
  //     password: null,
  //     estado: null,
  //     fullName: null,
  //     cidade: null,
  //     cpf: null,
  //     email: null,
  //     endereco: null,
  //     id: null,
  //     phone: null,
  //     userName: null,
  //   }
  // }

  // public PrepararCadastro(item: Fornecedor, delet?: any) {
  //   let p: any = {};
  //   let d = new Date();

  //   (item.cep == null) ? item.cep = 0 : item.cep = item.cep;
  //   (item.cidade == null) ? item.cidade = "" : item.cidade = item.cidade;
  //   (item.cpf == null) ? item.cpf = "" : item.cpf = item.cpf;
  //   (item.email == null) ? item.email = "" : item.email = item.email;
  //   (item.endereco == null) ? item.endereco = "" : item.endereco = item.endereco;
  //   (item.estado == null) ? item.estado = "" : item.estado = item.estado;
  //   (item.fullName == null) ? item.fullName = "" : item.fullName = item.fullName;
  //   (item.password == null) ? item.password = "" : item.password = item.password;
  //   (item.phone == null) ? item.phone = 0 : item.phone = item.phone;
  //   (item.userName == null) ? item.userName = "" : item.userName = item.userName;

  //   if (item.id > 0 && !delet) {

  //     p = {
  //       "id": item.id,
  //       "password": item.password,
  //       "estado": item.estado,
  //       "cidade": item.cidade,
  //       "fullName": item.fullName,
  //       "fornecedorsID": item.phone,
  //       "endereco": item.endereco,
  //       "phone": item.phone,
  //       "cpf": item.cpf,
  //       "userName": item.userName,
  //       "email": item.email
  //     }

  //     // this.fornecedorService.updateFornecedor(item.id, item);
  //   } else if (delet) {

  //     p = {
  //       ".password": item.password,
  //       ".estado": item.estado,
  //       ".cidade": item.cidade,
  //       ".fullName": item.fullName,
  //       ".fornecedorsID": item.phone,
  //       ".endereco": item.endereco,
  //       ".phone": item.phone,
  //       ".cpf": item.cpf,
  //       ".userName": item.userName,
  //       ".email": item.email
  //     }

  //     // this.fornecedorService.updateFornecedor(item.id, item);
  //   } else {
      
  //     p = {
  //       ".password": item.password,
  //       ".estado": item.estado,
  //       ".cidade": item.cidade,
  //       // "categoria": item.categoria,
  //       ".fullName": item.fullName,
  //       ".fornecedorsID": item.phone,
  //       ".endereco": item.endereco,
  //       // "nomeEstoque": item.nomeEstoque,
  //       ".phone": item.phone,
  //       ".cpf": item.cpf,
  //       ".userName": item.userName,
  //       ".email": item.email
  //     }

  //     // if (!delet) this.fornecedorService.postFornecedor(p).subscribe(res => console.log(res));
  //   }
  // }

}
