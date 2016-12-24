import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CguPage} from '../cgu/cgu';
import {SecuritePage} from '../securite/securite';
import{PolitiqueConfidentialitePage} from '../politique-confidentialite/politique-confidentialite';
import {ContactPage} from '../contact/contact';

/*
  Generated class for the Help page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})
export class HelpPage {

  public version:string="2.0.0";
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello HelpPage Page');
  }

  goToCgu()
  {
    this.navCtrl.push(CguPage);
  }

  goToSecurite()
  {
    this.navCtrl.push(SecuritePage)
  }

  goToPolitique()
  {
    this.navCtrl.push(PolitiqueConfidentialitePage)
  }

  goToContactPage()
  {
    this.navCtrl.push(ContactPage)
  }

}
