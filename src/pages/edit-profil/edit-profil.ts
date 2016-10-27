import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
  Generated class for the EditProfil page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-profil',
  templateUrl: 'edit-profil.html'
})
export class EditProfilModalPage {

  constructor(public navCtrl: NavController,public viewCtrl:ViewController) {

  }

  ionViewDidLoad() {
    console.log('Hello EditProfil Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
