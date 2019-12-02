import { Component, OnInit } from '@angular/core';
import { Produto } from "src/app/models/produto";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

const ELEMENT: Produto[] = [
  {"produtoId":2,"codigo":123456,"name":"Blusa Hering Polo","descricao":"Preta de listras azuis","categoria":"Masculina, Social","preco":25.55,"qtdProduto":10,"idEstoque":1,"nomeEstoque":"SP AJAX","qtdFornecida":100,"dataRetorno":"2019-11-19","vendedorID":2,"fornecedorID":1,"urlImage":"https://static.hering.com.br//sys_master/images/hec/h67/9612132876318.jpg?name=03CQ-N1007S-D1"},
  {"produtoId":3,"codigo":654321,"name":"Blusa Hering Babylook","descricao":"Rosa com babado","categoria":"Feminina","preco":49.99,"qtdProduto":10,"idEstoque":1,"nomeEstoque":"SP AJAX","qtdFornecida":105,"dataRetorno":"2019-11-22.663","vendedorID":2,"fornecedorID":1,"urlImage":"https://static.hering.com.br//sys_master/images/h1f/h1f/9611455496222.jpg?name=0241-RDSEN-D1"},
  {"produtoId":8,"codigo":846282,"name":"Blusa C/ Estampa HAHAHA","descricao":"Preta e Branca","categoria":"Manga curta, Feminina","preco":50.00,"qtdProduto":15,"idEstoque":1,"nomeEstoque":"SP AJAX","qtdFornecida":15,"dataRetorno":"2019-11-12","vendedorID":2,"fornecedorID":3,"urlImage":"https://http2.mlstatic.com/blusa-moletom-coringa-hahaha-risada-boca-full-bolsos-unissex-D_NQ_NP_919112-MLB31977556197_082019-O.webp"},
  {"produtoId":4,"codigo":456789,"name":"Blusa Polobeats Babylook","descricao":"Xadrez","categoria":"Unisex","preco":120.00,"qtdProduto":100,"idEstoque":1,"nomeEstoque":"SP AJAX","qtdFornecida":100,"dataRetorno":"2019-11-13","vendedorID":2,"fornecedorID":2,"urlImage":"https://tsetecustom.vteximg.com.br/arquivos/ids/1261280-1000-1000/233122-imagem.php-3Fsku-3D4190-26imagem-3D2019061817382700000078125.png?v=636964802059170000"},
  {"produtoId":5,"codigo":987654,"name":"Blusa Adidas Cott","descricao":"Listra Branca , Marca","categoria":"Masculina, Verão","preco":110.00,"qtdProduto":5,"idEstoque":1,"nomeEstoque":"SP AJAX","qtdFornecida":5,"dataRetorno":"2019-11-20","vendedorID":2,"fornecedorID":2,"urlImage":"https://imgcentauro-a.akamaihd.net/900x900/91580602/camiseta-adidas-core-18-masculina-img.jpg"},
  {"produtoId":6,"codigo":789123,"name":"Camiseta Adidas Core ","descricao":"Preto e Branco","categoria":"Uniforme, Masculina","preco":40.55,"qtdProduto":20,"idEstoque":1,"nomeEstoque":"SP AJAX","qtdFornecida":100,"dataRetorno":"2019-11-26.46","vendedorID":2,"fornecedorID":2,"urlImage":"https://imgcentauro-a.akamaihd.net/900x900/91580604/camiseta-adidas-core-18-masculina-img.jpg"},
  {"produtoId":7,"codigo":753951,"name":"Camiseta Colcci Lettering","descricao":"Preta","categoria":"Blusa, Feminina","preco":80.00,"qtdProduto":11,"idEstoque":1,"nomeEstoque":"SP AJAX","qtdFornecida":11,"dataRetorno":"2019-11-19","vendedorID":2,"fornecedorID":2,"urlImage":"https://dafitistatic-a.akamaihd.net/p/Colcci-Kids-Camiseta-Colcci-Kids-Menino-Lettering-Vermelha-4968-9037054-1-product.jpg"},
  {"produtoId":10,"codigo":654368,"name":"Vestido Curto Roxo","descricao":"Vestido em poliéster","categoria":"Moda Pop, Quintess, C/ Recortes","preco":35.99,"qtdProduto":10,"idEstoque":2,"nomeEstoque":"SP AJAX","qtdFornecida":204,"dataRetorno":"2019-11-19","vendedorID":0,"fornecedorID":3,"urlImage":"https://assets2.repassa.com.br/fit-in/480x0/filters:sharpen(0.5,0.5,true)/spree/products/179196/original/IMG_1592.JPG"},
  {"produtoId":9,"codigo":654365,"name":"Vestido Curto Preto","descricao":"Vestido em poliéster","categoria":"Moda Pop, Quintess, C/ Recortes","preco":79.99,"qtdProduto":204,"idEstoque":1,"nomeEstoque":"SP AJAX","qtdFornecida":204,"dataRetorno":"2019-11-19","vendedorID":0,"fornecedorID":3,"urlImage":"https://www.dhresource.com/0x0/f2/albu/g8/M00/B8/B9/rBVaV11jnSOAHkBRAATElvbwuYg909.jpg"},
  {"produtoId":11,"codigo":523467,"name":"Blusa Hering Rozada","descricao":"Rozada purpura.","categoria":"Masculina, Social","preco":25.99,"qtdProduto":100,"idEstoque":1,"nomeEstoque":"SP AJAX","qtdFornecida":100,"dataRetorno":"2019-11-19","vendedorID":2,"fornecedorID":3,"urlImage":"https://img.lojasrenner.com.br/item/547799303/zoom/5.jpg"},
  {"produtoId":12,"codigo":1560608769632,"name":"Macaquinho Transpassado","descricao":"Preta de listras azuis","categoria":"Moda Pop, Listrado com Alças","preco":39.99,"qtdProduto":105,"idEstoque":1,"nomeEstoque":"SP AJAX","qtdFornecida":105,"dataRetorno":"2019-11-21","vendedorID":0,"fornecedorID":1,"urlImage":"https://i.imgur.com/eKIuG6P.png"}
]

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  adicionouCarrrinho = false;

  produtos: Produto[] = ELEMENT;
  constructor(private router: Router,
    private cookie: CookieService,) { }

  ngOnInit() {
  }

  addCart() {
    this.adicionouCarrrinho = true;
    console.log(this.adicionouCarrrinho);
  }

  logout() {
    this.cookie.deleteAll();
    this.router.navigate(['user/login']);
  }
}
