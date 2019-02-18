import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService ) {
  }

  ionViewDidLoad() {
    // Pegando os parametros passados na navegação
    let categoria_id = this.navParams.get("categoria_id");
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content']; // pegando o atributo content
        this.loadImageUrls();
      },
      error => {});
    
  };
  
/* Percorrendo a lista de produtos, dentro do for pego uma referencia, 
chamo o serviço passando o id do produto,
se a imagem existir no bucket, eu monto a url como resposta

*/

  loadImageUrls() {
    for(var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImagemFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {});
    }
  }

}
