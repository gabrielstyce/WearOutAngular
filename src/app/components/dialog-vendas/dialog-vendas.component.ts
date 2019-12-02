import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { NegociacaoRetorno } from 'src/app/models/negociacaoDetail';
//dialog-box.component.ts
import { MainNavComponent } from '../../pages/main-nav/main-nav.component';
import { Produto } from 'src/app/models/produto';

@Component({
  selector: 'app-dialog-vendas',
  templateUrl: './dialog-vendas.component.html',
  styleUrls: ['./dialog-vendas.component.scss']
})
export class DialogVendasComponent {

  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}

