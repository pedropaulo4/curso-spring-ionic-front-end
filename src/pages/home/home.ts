import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage() // pra falar que a classe é uma pagina, e eu referenciar a classe com String escrevendo o nome entre aspas
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
