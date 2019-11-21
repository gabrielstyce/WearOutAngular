export class MasterEranca {
  constructor() { }

  public userVerificado = false;
  private sistema = 'WearOut - Controle';
  public titleTela = '';



  nomesTela(NomeTela: string) {
    switch (NomeTela) {
      // Clientes
      case 'Relacao_Clientes':
        return '/clientes/relacao';
      // Fornecedor
      case 'Cadastro_Fornecedor':
        return 'fornecedores/cadastro';
      case 'Relacao_Fornecedores':
        return 'fornecedores/relacao';
      // Produtos
      case 'Cadastro_Produto':
        return '/produtos/cadastro';
      case 'Relacao_Produtos':
        return '/produtos/relacao';
      case 'Estoque':
        return '/produtos/estoque';
      // Vendas
      case 'Baixa':
        return 'vendas/baixa';
      case 'Relacao_Vendas':
        return 'vendas/relacao';
      //
      default:
        return '/home';
    }
  }

  nomesTelaCodigo() {

  }

  /**
   * SetTitleTela: seta o nome da tela de forma genérica;
   */
  public SetTitleTela(tela: string): string {
    const separador = ' | ';

    if (tela.length <= 0) {
      return this.sistema;
    } else {
      return this.sistema + separador + tela;
    }
  }
}