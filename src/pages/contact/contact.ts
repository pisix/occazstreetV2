import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ContactSujetPage} from '../contact-sujet/contact-sujet';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ContactPage Page');
  }

  goToContactForm(message)
  {
    this.navCtrl.push(ContactSujetPage,message);
  }

}
