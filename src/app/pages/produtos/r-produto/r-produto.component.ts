import { Component, OnInit } from '@angular/core';
import { MainNavComponent } from '../../main-nav/main-nav.component';
import { MasterEranca } from 'src/app/masterEranca';

@Component({
  selector: 'app-r-produto',
  templateUrl: './r-produto.component.html',
  styleUrls: ['./r-produto.component.scss']
})
export class RProdutoComponent extends MasterEranca implements OnInit {

  constructor(private componenteMenu: MainNavComponent) {
    super();
    this.componenteMenu.titleTela = this.SetTitleTela("Relação de Produtos");
  }

  ngOnInit() {
  }

}
