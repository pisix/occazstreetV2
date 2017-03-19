import { Component } from '@angular/core';
import {NavParams, NavController, ModalController,Events,AlertController,ToastController} from 'ionic-angular';
import {GlobalsConstants} from "../../constants/globals.constants";
import {ConnexionModalPage} from "../connexion/connexion";
import {SignupPage} from '../signup/signup';
import {UtilisateurService} from '../../services/utilisateur.service';
import {MessageService} from "../../services/message.service";

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
        this.navCtrl.push(ConnexionModalPage)
    }

    signup()
    {
        this.navCtrl.push(SignupPage)
    }

}
