import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

//MyComponents
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainNavComponent } from './main-nav.component';
import { CProdutoComponent } from './produtos/c-produto/c-produto.component';
import { EstoqueComponent } from './produtos/estoque/estoque.component';
import { CFornecedorComponent } from './fornecedor/c-fornecedor/c-fornecedor.component';
import { RClienteComponent } from './clientes/r-cliente/r-cliente.component';
import { RVendaComponent } from './vendas/r-venda/r-venda.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';
import { PerfilComponent } from './perfil/perfil.component';


//Modules Main
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatSliderModule, MatInputModule, MatMenuModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatDialogModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule, AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { MainpageComponent } from '../ecommerce/mainpage/mainpage.component';
import { LogginComponent } from '../loggin/loggin.component';


@NgModule({
    declarations: [
        LogginComponent,
        MainpageComponent,
        MainNavComponent,
        DashboardComponent,
        //Produto
        CProdutoComponent,
        EstoqueComponent,
        //Fornecedor
        CFornecedorComponent,
        //Clientes
        RClienteComponent,
        //Vendas
        RVendaComponent,
        //User
        PerfilComponent,
        //Angular
        TableComponent,
        DialogBoxComponent,
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatSortModule,
        // NGX Bootstrap
        TabsModule,
        AccordionModule,
        BsDatepickerModule,
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
        // MainNavRoutingModule,
    ],
    entryComponents: [
        DialogBoxComponent
    ],
    exports: [],
    providers: [],
})
export class MainNavModule { }