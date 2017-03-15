import { Component } from '@angular/core';
import {NavParams, NavController, ModalController,Events,AlertController,ToastController} from 'ionic-angular';
import {GlobalsConstants} from "../../constants/globals.constants";
import {MessagesConstants} from '../../constants/messages.constants';
import {ConnexionModalPage} from "../../pages/connexion/connexion";
import {SignupPage} from '../../pages/signup/signup';
import {Facebook, Device} from 'ionic-native';
import {UtilisateurService} from '../../services/utilisateur.service';
import {HomePage} from "../home/home";
import {MessageService} from "../../services/message.service";
import {ConfirmSignupPage} from '../../pages/confirm-signup/confirm-signup';


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
  public logged:boolean=false;
  public infoLoggedUser=null;
  public message;


  constructor(private navParams: NavParams,public messageService:MessageService,public toastCtrl:ToastController,public alertCtrl:AlertController,public events:Events,private navCtrl: NavController,private modalController:ModalController,public utilisateurService:UtilisateurService) {
    this.message=navParams.get('message')
  }

    connexion()
    {
        /*let modal=this.modalController.create(ConnexionModalPage);
        modal.present();*/
        this.navCtrl.push(ConnexionModalPage)
    }

    signup()
    {
        this.navCtrl.push(SignupPage)
    }

}
