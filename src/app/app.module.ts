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
  MatFormFieldModule
} from '@angular/material';

// Modulos do Ngx-Bootstrap
import {
  TabsModule,
  AccordionModule,
  BsDatepickerModule
} from 'ngx-bootstrap';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainNavComponent } from './pages/main-nav/main-nav.component';
import { CProdutoComponent } from './pages/produtos/c-produto/c-produto.component';
import { RProdutoComponent } from './pages/produtos/r-produto/r-produto.component';
import { RFornecedorComponent } from './pages/fornecedor/r-fornecedor/r-fornecedor.component';
import { CFornecedorComponent } from './pages/fornecedor/c-fornecedor/c-fornecedor.component';
import { RClienteComponent } from './pages/clientes/r-cliente/r-cliente.component';
import { BaixaComponent } from './pages/vendas/baixa/baixa.component';
import { EstoqueComponent } from './pages/produtos/estoque/estoque.component';
import { RVendaComponent } from './pages/vendas/r-venda/r-venda.component';
import { TableComponent } from './components/table/table.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainNavComponent,
    CProdutoComponent,
    RProdutoComponent,
    EstoqueComponent,
    RFornecedorComponent,
    CFornecedorComponent,
    RClienteComponent,
    BaixaComponent,
    RVendaComponent,
    TableComponent,
    DialogBoxComponent,
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
    //Service
    HttpClientModule,
    ChartsModule,
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
