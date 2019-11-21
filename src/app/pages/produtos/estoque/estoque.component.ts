import { Component, OnInit } from '@angular/core';
import { MainNavComponent } from '../../main-nav/main-nav.component';
import { MasterEranca } from 'src/app/masterEranca';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent extends MasterEranca implements OnInit {

  constructor(private componenteMenu: MainNavComponent) {
    super();
    this.componenteMenu.titleTela = this.SetTitleTela("Estoque");
  }

  ngOnInit() {
  }

}
