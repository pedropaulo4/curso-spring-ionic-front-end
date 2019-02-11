import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage() // pra falar que a classe é uma pagina, e eu referenciar a classe com String escrevendo o nome entre aspas
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  /*
  Quando entrar na página o menu vai estar desabilitado
  */
  ionViewWillEnter(){
    this.menu.swipeEnable(false);
   }
 /*
  Quando sair na página o menu vai estar habilitado para o usuário
  */

   ionViewDidLeave(){
    this.menu.swipeEnable(true);
   }

  /*
  Push: Empilha uma pagina em cima da outra.
  SetRoot: Para ir para outra pagina.
  */
  login() {
    this.navCtrl.setRoot('CategoriasPage');

  }

  




}
