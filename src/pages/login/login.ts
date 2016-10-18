import { Component } from '@angular/core';
import { NavController, ModalController,Events,AlertController,ToastController} from 'ionic-angular';
import {GlobalsConstants} from "../../constants/globals.constants";
import {MessagesConstants} from '../../constants/messages.constants';
import {ConnexionModalPage} from "../../pages/connexion/connexion";
import {SignupPage} from '../../pages/signup/signup';
import {Facebook, Device} from 'ionic-native';
import {UtilisateurService} from '../../services/utilisateur.service';
import {HomePage} from "../home/home";


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


  constructor(public toastCtrl:ToastController,public alertCtrl:AlertController,public events:Events,private navCtrl: NavController,private modalController:ModalController,public utilisateurService:UtilisateurService
  ) {

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

  facebook()
  {

    let userData = {
      device: Device.device.manufacturer + " " + Device.device.model,
      os: Device.device.platform + " " + Device.device.version
    };

    Facebook.login(["email", "public_profile", "user_website", "user_location", "user_relationships","user_birthday"]).then(res=>{
      alert(JSON.stringify(res));
      this.utilisateurService.doOauth(res.authResponse.accessToken,userData).subscribe(resu=>{
        if(resu.success)
        {
          this.events.publish('user:logged-data',resu.data);
          this.events.publish('user:logged',true);
          this.navCtrl.setRoot(HomePage);
          this.showToast(MessagesConstants.welcome)
        }
        else
        {
          this.showAlert(MessagesConstants.erreurOAuthMessage+MessagesConstants.parFacebook,"Connexion ");
        }
      })
    });
  }

  showAlert(message,title)
  {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  showToast(message)
  {
     let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
