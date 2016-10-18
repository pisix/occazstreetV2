import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import {GlobalsConstants} from "../../constants/globals.constants";
import {ConnexionModalPage} from "../../pages/connexion/connexion";
import {SignupPage} from '../../pages/signup/signup';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector:'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public title = GlobalsConstants.APPNAME;

  constructor(private navCtrl: NavController,private modalController:ModalController) {

  }

    connexion()
    {
        /*let modal=this.modalController.create(ConnexionModalPage);
        modal.present();*/
        this.navCtrl.push(ConnexionModalPage)
    }

    // signup()
    // {
    //     this.navCtrl.push(SignupPage)
    // }

}
