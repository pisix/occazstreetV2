import { Component } from '@angular/core';
import {NavController, ViewController, ToastController, ModalController, Events,LoadingController,AlertController} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {UtilisateurService} from '../../services/utilisateur.service'
import {ResetPasswordModalPage} from "../reset-password/reset-password";
import {HomePage} from "../home/home";
import {Facebook, Device} from 'ionic-native';
import {MessagesConstants} from '../../constants/messages.constants';
import {MessageService} from '../../services/message.service';




/*
 Generated class for the Connexion page.v

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html'
})
export class ConnexionModalPage {

  public loginForm: NgForm;
  public email: string;
  public password: string;
  public  connected:boolean =false;
  public infoLoggedUser=null;
  public logged:boolean=false;
 // private loading:LoadingController;
  constructor(public alertCtrl:AlertController,public messageService:MessageService,public events:Events,private modalController:ModalController,private utilisateurService:UtilisateurService,public loadingCtrl:LoadingController, public navCtrl: NavController,private viewCtrl: ViewController,private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('Hello Connexion Page');
  }

  onSubmit(f) {

    let credentials={email:f.value.email,password:f.value.password};
    this.email=f.value.email;
    this.password=f.value.password;
    this.utilisateurService.login(credentials).subscribe(res => {

      if(!res.success)
      {
       // this.loading().dismiss();
        this.messageService.showToast("Le login ou le mot de passe est incorrect");
      }else if (res.success)
      {
        this.connected=true;
        this.logged=true;
        this.infoLoggedUser=res.data;
        this.events.publish('user:logged-data',res.data);
        this.events.publish('user:logged',true);
        this.navCtrl.setRoot(HomePage);
        this.messageService.showToast("Faites vous plaisir");
      }
    })


  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

   /*showLoader(){
      this.loading.present();
   }

   hideLoader()
   {
     this.loading.dismiss();
   }*/


  resetPassword()
  {
    this.navCtrl.push(ResetPasswordModalPage);
    /* let modal=this.modalController.create(ResetPasswordModalPage);
     modal.present();*/
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
          this.messageService.showToast("(MessagesConstants.welcome");
        }
        else
        {
          this.messageService.showAlert(MessagesConstants.erreurOAuthMessage+MessagesConstants.parFacebook,"Connexion ");
        }
      })
    });
  }

  google()
  {

  }

}
