import { Component } from '@angular/core';
import { NavController,ViewController, ToastController,ModalController,AlertController } from 'ionic-angular';
import {Toast,NativeStorage} from 'ionic-native'
import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl,FormGroup} from '@angular/common';
import {NgForm} from '@angular/forms';
import {CustomValidators} from '../../validators/CustomValidators';
import {UtilisateurService} from '../../services/utilisateur.service'
import {GlobalsConstants} from "../../constants/globals.constants";


@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordModalPage {
  forgotPasswordForm: NgForm;
  email: string;


  constructor(private alertCtrl: AlertController,private utilisateurService:UtilisateurService, public navCtrl: NavController,private viewCtrl: ViewController,private toastCtrl: ToastController) {


  }

  onSubmit(f) {
    //this.showLoader();
    this.email=f.value.email;
    this.utilisateurService.reInitPassword(f.value.email).subscribe(res => {

      if(!res.success)
      {
        console.log(JSON.stringify(res));
         this. showAlert("Cette adresse email n\'est associ&eacute;e &#224; aucun compte. &#202;tes vous certain d\'avoir un compte ?","Adresse email :( ");
      }else if (res.success)
      {
          this. showAlert("Votre mot de passe a &#233;t&#233; reinitailis&#233; et un nouveau mot de passe temporaire a &#233;t&#233; envoy&#233; dans votre boite mail","Adresse e-mail :)");
      }
    })
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

}
