import { Component } from '@angular/core';
import {NavController, ViewController, ToastController, ModalController, Events,LoadingController} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {UtilisateurService} from '../../services/utilisateur.service'
import {ResetPasswordModalPage} from "../reset-password/reset-password";
import {HomePage} from "../home/home";

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
  constructor(public events:Events,private modalController:ModalController,private utilisateurService:UtilisateurService,public loadingCtrl:LoadingController, public navCtrl: NavController,private viewCtrl: ViewController,private toastCtrl: ToastController) {
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
        this.showToast("Le login ou le mot de passe est incorrect");
      }else if (res.success)
      {
        this.connected=true;
        this.logged=true;
        this.infoLoggedUser=res.data;
        this.events.publish('user:logged-data',res.data);
        this.events.publish('user:logged',true);
        this.navCtrl.setRoot(HomePage);
        this.showToast("Faites vous plaisir");
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

  showToast(message)
  {
    /*Toast.show(message, '5000', 'bottom').subscribe(
     toast => {
     console.log(toast);
     }
     );*/

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

  resetPassword()
  {
    this.navCtrl.push(ResetPasswordModalPage);
    /* let modal=this.modalController.create(ResetPasswordModalPage);
     modal.present();*/
  }
}
