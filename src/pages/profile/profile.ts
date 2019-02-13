import { StorageService } from './../../services/storage.services';
import { STORAGE_KEYS } from './../../config/storage_keys.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();

    if(localUser && localUser.email) {
      this.email = localUser.email;
    }
  }

}
