import { Component } from '@angular/core';
import { NavController, NavParams,Events,LoadingController} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {UtilisateurService} from '../../services/utilisateur.service';
import {MessageService} from '../../services/message.service';
import {GlobalsConstants} from '../../constants/globals.constants';
import {HomePage} from '../../pages/home/home';

declare var jQuery:any;
/*
  Generated class for the ConfirmSignup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-confirm-signup',
  templateUrl: 'confirm-signup.html'
})
export class ConfirmSignupPage {

  digiCodeForm: NgForm;
  public code1:number;
  public code2:number;
  public code3:number;
  public code4:number;
  public code5:number;
  public code6:number;
  public adresseEmail:string;
  public showError:boolean=false;

  constructor(public loadingCtrl:LoadingController,public events:Events,public messageService:MessageService,public userService:UtilisateurService,public navCtrl: NavController, public navParams: NavParams) {
    this.adresseEmail=JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED)).email
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmSignupPage');
  }

  onSubmit(f)
  {
    let loading=this.loadingCtrl.create();
    loading.present();
    this.userService.checkEmailConfirmationCode(this.adresseEmail,this.code1+this.code2+this.code3+this.code4+this.code5+this.code6).subscribe(res=>{
      if(res.codeCorrecte)
      {
        loading.dismiss();
        localStorage.setItem(GlobalsConstants.USER_LOGGED, JSON.stringify(res.data));
        this.events.publish('user:logged-data',res.data);
        this.events.publish('user:logged',true);
        this.navCtrl.setRoot(HomePage);
        this.messageService.showToast("Faites vous plaisir");
      }
      else
      {
        loading.dismiss();
        this.messageService.showToast("Le code saisit n'est pas celui que nous vous avons envoyé à l'adresse "+this.adresseEmail,"top");
      }
    })

  }

  onKey(f) {
    console.log('onkey');
    /*var index = jQuery(this).index("input");
     jQuery("input:eq(" + (index +1) + ")").focus();*/
  }

  resendConfirmationCode()
  {
    this.userService.regenerateEmailConfirmationCode(this.adresseEmail).subscribe(res=>{
      if(res.success)
      {
        this.messageService.showToast("Le code a été envoyé à l'adresse "+this.adresseEmail);
      }
      else
      {
        this.messageService.showToast("L'adresse email n'est pas reconnu. Veuillez recommencez le processus d'inscription","top");
      }
    })
  }

}
