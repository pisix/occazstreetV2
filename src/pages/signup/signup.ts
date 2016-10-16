import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { NavController, Events,ToastController, AlertController,LoadingController} from 'ionic-angular';
import {Device} from 'ionic-native';
import {UtilisateurService} from '../../services/utilisateur.service';
import {HomePage} from '../home/home';
import {MessagesConstants} from '../../constants/messages.constants';
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


  constructor(public navCtrl: NavController,public events:Events,public loadingCtrl:LoadingController,public toastCtrl:ToastController,private utilisateurService:UtilisateurService,public alertCtrl:AlertController) {
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
            device: Device.device.manufacturer + " " + Device.device.model,
            os: Device.device.platform + " " + Device.device.version
        };

        this.utilisateurService.signup(user).subscribe(res =>{

            if(res.success)
            {
              this.events.publish('user:logged-data',res.data);
                this.events.publish('user:logged',true);

                this.navCtrl.setRoot(HomePage);
                this.showToast(MessagesConstants.welcome);
           }else if(!res.success && res.existant)
           {
            this.showAlert(MessagesConstants.changementEmailError,"Inscription");
          }
          else
            {
              this.showAlert(MessagesConstants.inscriptionFailed,"Inscription");

            }
        })

    }

    showToast(message)
    {
        /*Toast.show(message, '5000', 'bottom').subscribe(
         toast => {
         console.log(toast);
         }
         );*/

        let toast = this.toastCtrl.create({
            message: message,
            duration: 4000,
            position: 'top',
            cssClass:'red-error'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
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

 /* showLoader(){
    this.loading.present();
  }

  hideLoader()
  {
    this.loading.dismiss();
  }*/

}
