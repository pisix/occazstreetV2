import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { NavController, Events,ToastController, AlertController,LoadingController} from 'ionic-angular';
import {Device} from 'ionic-native';
import {UtilisateurService} from '../../services/utilisateur.service';
import {HomePage} from '../home/home';
import {MessagesConstants} from '../../constants/messages.constants';
import {MessageService} from '../../services/message.service';

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
  // private loading:LoadingController;


  constructor(public navCtrl: NavController,public messageService:MessageService,public events:Events,public loadingCtrl:LoadingController,public toastCtrl:ToastController,private utilisateurService:UtilisateurService,public alertCtrl:AlertController) {
    /*this.loading = this.loadingCtrl.create({
      content: 'Patientez...'
    });*/
  }

  ionViewDidLoad() {
    console.log('Hello Signup Page');
  }

    onSubmit(f)
    {
      /*this.loading = this.loadingCtrl.create({
        content: 'Patientez...'
      });*/
      let user={
            email: f.value.email,
            password: f.value.password,
            nom: f.value.nom,
            prenom: f.value.prenom,
            sexe: f.value.sexe,
            dateDeNaissance: null,
            device: Device.manufacturer + " " + Device.model,
            os: Device.platform + " " + Device.version
        };

        this.utilisateurService.signup(user).subscribe(res =>{

            if(res.success)
            {
              this.events.publish('user:logged-data',res.data);
                this.events.publish('user:logged',true);

                this.navCtrl.setRoot(HomePage);
                this.messageService.showToast(MessagesConstants.welcome);

            }else if(!res.success && res.existant)
           {
             this.messageService.showToast(MessagesConstants.changementEmailError,"Inscription");
           }
          else
            {
              this.messageService.showToast(MessagesConstants.inscriptionFailed,"Inscription");
            }
        })

    }
  /* showLoader(){
    this.loading.present();
  }

  hideLoader()
  {
    this.loading.dismiss();
  }*/

}
