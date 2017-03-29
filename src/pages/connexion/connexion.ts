import { Component } from '@angular/core';
import {NavController, ViewController, ToastController, ModalController, Events,LoadingController,AlertController} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {UtilisateurService} from '../../services/utilisateur.service'
import {ResetPasswordModalPage} from "../reset-password/reset-password";
import {HomePage} from "../home/home";
import {Facebook,GooglePlus} from 'ionic-native';
import {MessagesConstants} from '../../constants/messages.constants';
import {MessageService} from '../../services/message.service';
import {GlobalsConstants} from '../../constants/globals.constants';


declare let device;

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
        this.messageService.showToast("Le login ou le mot de passe est incorrect",'top');
      }else if (res.success)
      {
        console.log(res.data);
        this.connected=true;
        this.logged=true;
        this.infoLoggedUser=res.data;
        localStorage.setItem(GlobalsConstants.USER_LOGGED, JSON.stringify(res.data));

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
      device: device.manufacturer + " " + device.model,
      os: device.platform + " " + device.version,
      provider:'Facebook'

    };

    Facebook.login(["email", "public_profile", "user_website", "user_location", "user_relationships","user_birthday"]).then(res=>{
      this.utilisateurService.doOauth(res.authResponse.accessToken,userData).subscribe(resu=>{
        if(resu.success)
        {
          this.events.publish('user:logged-data',resu.data);
          this.events.publish('user:logged',true);
          this.navCtrl.setRoot(HomePage);
          this.messageService.showToast(MessagesConstants.welcome);
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
    console.log("doGoogle");
    let userData = {
      device: device.manufacturer + " " + device.model,
      os: device.platform + " " + device.version,
      provider:'Google'
    };
    GooglePlus.login(
      {
        'webClientId': GlobalsConstants.REVERSEGOOGLECLIENTID,
        'offline':false
      }
    )
      .then(res => {
        console.log(res);
        this.utilisateurService.doOauth(res.authResponse.accessToken,userData).subscribe(resu=>{
          if(resu.success)
          {
            this.events.publish('user:logged-data',resu.data);
            this.events.publish('user:logged',true);
            this.navCtrl.setRoot(HomePage);
            this.messageService.showToast(MessagesConstants.welcome);
          }
          else
          {
            this.messageService.showAlert(MessagesConstants.erreurOAuthMessage+MessagesConstants.parFacebook,"Connexion ");
          }
        })
      })
      .catch(err => {
        console.log(err);
        alert(err)
      });
  }

}
