import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

// Componentes Angular Material
import {
  MatSliderModule,
  MatMenuModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatInputModule,
  MatDialogModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';

// Modulos do Ngx-Bootstrap
import {
  TabsModule,
  AccordionModule,
  BsDatepickerModule
} from 'ngx-bootstrap';

// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { MainNavComponent } from './pages/main-nav/main-nav.component';
// import { CProdutoComponent } from './pages/produtos/c-produto/c-produto.component';
// import { CFornecedorComponent } from './pages/fornecedor/c-fornecedor/c-fornecedor.component';
// import { RClienteComponent } from './pages/clientes/r-cliente/r-cliente.component';
// import { BaixaComponent } from './pages/vendas/baixa/baixa.component';
// import { EstoqueComponent } from './pages/produtos/estoque/estoque.component';
// import { RVendaComponent } from './pages/vendas/r-venda/r-venda.component';
// import { TableComponent } from './components/table/table.component';
// import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
// import { PerfilComponent } from './pages/user/perfil/perfil.component';
// import { MainpageComponent } from './pages/ecommerce/mainpage/mainpage.component';
// import { LogginComponent } from './pages/user/loggin/loggin.component';

import { DashboardComponent } from './pages/main-nav/dashboard/dashboard.component';
import { MainNavComponent } from './pages/main-nav/main-nav.component';
import { CProdutoComponent } from './pages/main-nav/produtos/c-produto/c-produto.component';
import { EstoqueComponent } from './pages/main-nav/produtos/estoque/estoque.component';
import { CFornecedorComponent } from './pages/main-nav/fornecedor/c-fornecedor/c-fornecedor.component';
import { RClienteComponent } from './pages/main-nav/clientes/r-cliente/r-cliente.component';
import { RVendaComponent } from './pages/main-nav/vendas/r-venda/r-venda.component';
import { TableComponent } from './components/table/table.component';
import { PerfilComponent } from './pages/main-nav/perfil/perfil.component';
import { LogginComponent } from './pages/loggin/loggin.component';
import { MainpageComponent } from './pages/ecommerce/mainpage/mainpage.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import {MatCardModule} from '@angular/material/card';
import { CarrinhoComponent } from './pages/ecommerce/carrinho/carrinho.component';
import { DialogVendasComponent } from './components/dialog-vendas/dialog-vendas.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainNavComponent,
    CProdutoComponent,
    EstoqueComponent,
    CFornecedorComponent,
    RClienteComponent,
    RVendaComponent,
    TableComponent,
    DialogBoxComponent,
    PerfilComponent,
    MainpageComponent,
    LogginComponent,
    CarrinhoComponent,
    DialogVendasComponent,
  ],
  imports: [
    //Angular
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    // NGX Bootstrap
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    //Angular Material
    MatSliderModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    //Service
    HttpClientModule,
    ChartsModule,
  ],
  entryComponents: [
    DialogBoxComponent,
    DialogVendasComponent
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
