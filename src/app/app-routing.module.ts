import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLink } from '@angular/router';
import { DashboardComponent } from './pages/main-nav/dashboard/dashboard.component';
import { MainNavComponent } from './pages/main-nav/main-nav.component';
import { CProdutoComponent } from './pages/main-nav/produtos/c-produto/c-produto.component';
import { EstoqueComponent } from './pages/main-nav/produtos/estoque/estoque.component';
import { CFornecedorComponent } from './pages/main-nav/fornecedor/c-fornecedor/c-fornecedor.component';
import { RClienteComponent } from './pages/main-nav/clientes/r-cliente/r-cliente.component';
import { RVendaComponent } from './pages/main-nav/vendas/r-venda/r-venda.component';
import { PerfilComponent } from './pages/main-nav/perfil/perfil.component';
import { LogginComponent } from './pages/loggin/loggin.component';
import { MainpageComponent } from './pages/ecommerce/mainpage/mainpage.component';

const routes: Routes = [
  {
    path: 'core',
    component: MainNavComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'clientes',
        children: [
          { path: 'relacao', component: RClienteComponent },
        ],
      },
      {
        path: 'fornecedores',
        children: [
          { path: 'cadastro', component: CFornecedorComponent },
        ],
      },
      {
        path: 'produtos',
        children: [
          { path: 'cadastro', component: CProdutoComponent },
          { path: 'estoque', component: EstoqueComponent },
        ],
      },
      {
        path: 'vendas',
        children: [
          { path: 'relacao', component: RVendaComponent },
        ],
      },
    ],
  },
  {
    path: 'venda/:id',
    component: MainpageComponent,
  },
  {
    path: 'user',
    children: [
      { path: 'perfil', component: PerfilComponent, data: { title: 'Wear Out - Controle | Perfil' } },
      { path: 'login', component: LogginComponent, data: { title: 'Wear Out - Controle | Loggin' } },
    ],
  },
  {
    path: '',
    redirectTo: 'user/login',
    pathMatch: 'full'
  },
  { path: '**', component: MainpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
