import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLink } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { MainNavComponent } from './pages/main-nav/main-nav.component';
import { CProdutoComponent } from './pages/produtos/c-produto/c-produto.component';
import { EstoqueComponent } from './pages/produtos/estoque/estoque.component';
import { CFornecedorComponent } from './pages/fornecedor/c-fornecedor/c-fornecedor.component';
import { RFornecedorComponent } from './pages/fornecedor/r-fornecedor/r-fornecedor.component';
import { RClienteComponent } from './pages/clientes/r-cliente/r-cliente.component';
import { BaixaComponent } from './pages/vendas/baixa/baixa.component';
import { RVendaComponent } from './pages/vendas/r-venda/r-venda.component';
import { TableComponent } from './components/table/table.component';


const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent,
    data: { title: 'Wear Out - Controle' }
  },
  {
    path: 'clientes',
    children : [
        { path: 'relacao', component : RClienteComponent, data: { title: 'Wear Out - Controle | Relação de Clientes' } },
    ],
  },
  {
    path: 'fornecedores',
    children : [
        { path: 'cadastro', component : CFornecedorComponent, data: { title: 'Wear Out - Controle | Cadastro de Fornecedor' } },
        { path: 'relacao', component : RFornecedorComponent, data: { title: 'Wear Out - Controle | Relação de Fornecedor' } },
    ],
  },
  {
    path: 'produtos',
    children : [
        { path: 'cadastro', component : CProdutoComponent, data: { title: 'Wear Out - Controle | Cadastro de Produtos' } },
        { path: 'estoque', component : EstoqueComponent, data: { title: 'Wear Out - Controle | Estoque' } },
    ],
  },
  {
    path: 'vendas',
    children : [
        { path: 'baixa', component : BaixaComponent, data: { title: 'Wear Out - Controle | Cadastro de Produtos' } },
        { path: 'relacao', component : RVendaComponent, data: { title: 'Wear Out - Controle | Relação de Produtos' } },
    ],
  },
  {
    path: 'teste',
    children : [
        { path: 'table', component : TableComponent, data: { title: 'Wear Out - Controle | Cadastro de Produtos' } },
    ],
  },
  { path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
{ path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
