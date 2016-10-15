import { Component } from '@angular/core';
import { NavController,ViewController, ToastController,ModalController, Events} from 'ionic-angular';
import {Toast,NativeStorage} from 'ionic-native'
import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl,FormGroup} from '@angular/common';
import {NgForm} from '@angular/forms';
import {CustomValidators} from '../../validators/CustomValidators';
import {UtilisateurService} from '../../services/utilisateur.service'
import {GlobalsConstants} from "../../constants/globals.constants";
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

    loginForm: NgForm;
    email: string;
    password: string;
    public  connected:boolean =false;
    public infoLoggedUser=null;
    public logged:boolean=false;
    constructor(public events:Events,private modalController:ModalController,private utilisateurService:UtilisateurService, public navCtrl: NavController,private viewCtrl: ViewController,private toastCtrl: ToastController) {


    }

  ionViewDidLoad() {
    console.log('Hello Connexion Page');
  }

    onSubmit(f) {
        //this.showLoader();
        var credentials={email:f.value.email,password:f.value.password};
        this.email=f.value.email;
        this.password=f.value.password;
        this.utilisateurService.login(credentials).subscribe(res => {

            if(!res.success)
            {
               console.log(JSON.stringify(res));
                this.showToast("Le login ou le mot de passe est incorrect");
            }else if (res.success)
            {

              //  this.showToast("Faites vous plaisir");
                this.connected=true;
                this.logged=true;
                this.infoLoggedUser=res.data;
                this.events.publish('user:logged-data',eval(res.data));
                this.events.publish('user:logged',true);
               //sZ this.navCtrl.pop();
             //   this.dismiss();
                this.navCtrl.setRoot(HomePage);
            }
        })


    }

    dismiss() {
    this.viewCtrl.dismiss();
  }

    showLoader(){
        let loading = Loading.create({
            content: 'Please wait...'
        });
        this.nav.present(loading);
    }

    hideLoader()
    {
        this.nav.dismissAll();
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

    resetPassword()
    {
        this.navCtrl.push(ResetPasswordModalPage);
       /* let modal=this.modalController.create(ResetPasswordModalPage);
        modal.present();*/
    }
}
