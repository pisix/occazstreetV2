import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { NavController, Events,ToastController, AlertController,LoadingController} from 'ionic-angular';
import {Device,Push} from 'ionic-native';
import {UtilisateurService} from '../../services/utilisateur.service';
import {HomePage} from '../home/home';
import {MessagesConstants} from '../../constants/messages.constants';
import {MessageService} from '../../services/message.service';
import {ConfirmSignupPage} from '../../pages/confirm-signup/confirm-signup';
import {GlobalsConstants} from '../../constants/globals.constants';

declare var device;

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

    signupForm: NgForm;
    public email:string;
    public password:string;
    public sexe:number;
    public  nom:string;
    public prenom:string;
    public dateDeNaissance:Date;
  // private loading:LoadingController;
  private tokenData;


  constructor(public navCtrl: NavController,public messageService:MessageService,public events:Events,public loadingCtrl:LoadingController,public toastCtrl:ToastController,private utilisateurService:UtilisateurService,public alertCtrl:AlertController) {

  }

  ionViewDidLoad() {
    console.log('Hello Signup Page');
  }

    onSubmit(f)
    {
      let push = Push.init({
        android: {
          // (old)senderID: "860269311689"
          senderID:"448214499045"
        },
        ios: {
          senderID: "448214499045",
          alert: "true",
          badge: false,
          sound: "true"
        },
        windows: {}
      });

      push.on('registration', (data) => {
        //TODO - send device token to server
        this.tokenData=data.registrationId;
        let loading=this.loadingCtrl.create();
        loading.present();
        let user={
          email: f.value.email,
          password: f.value.password,
          nom: f.value.nom,
          prenom: f.value.prenom,
          sexe: f.value.sexe,
          dateDeNaissance: f.value.dateDeNaissance,
          device: device.manufacturer + " " + device.model,
          os: device.platform + " " + device.version,
          deviceToken:this.tokenData
        };



        this.utilisateurService.signup(user).subscribe(res =>{
          if(res.success)
          {
            this.events.publish('user:logged-data',res.data);

            if(res.provider)
            {
              loading.dismiss()
              localStorage.setItem(GlobalsConstants.USER_LOGGED, JSON.stringify(res.data));
              this.events.publish('user:logged',true);
              this.navCtrl.setRoot(HomePage);
              this.messageService.showToast("Faites vous plaisir");
            }
            else
            {
              loading.dismiss();

              this.navCtrl.push(ConfirmSignupPage);
            }

          }else if(!res.success && res.existant)
          {
            loading.dismiss();
            this.messageService.showAlert(MessagesConstants.changementEmailError,"Inscription");
          }
          else
          {
            loading.dismiss();
            this.messageService.showAlert(MessagesConstants.inscriptionFailed,"Inscription");
          }
        })
      });

    }
  /* showLoader(){
    this.loading.present();
  }

  hideLoader()
  {
    this.loading.dismiss();
  }*/

}
