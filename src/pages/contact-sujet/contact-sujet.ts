import { Component } from '@angular/core';
import { NavController, LoadingController,NavParams } from 'ionic-angular';
import { FormBuilder, Validators,NgForm,FormGroup } from '@angular/forms';
import {UtilisateurService} from '../../services/utilisateur.service';
import {MessageService} from '../../services/message.service';



/*
  Generated class for the ContactSujet page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contact-sujet',
  templateUrl: 'contact-sujet.html'
})
export class ContactSujetPage {

  public sujet:string;
  public name:string;
  public email:string;
  public message:string;
  contactForm:FormGroup;
  constructor(  private navParams: NavParams, private _formBuilder: FormBuilder, public navCtrl: NavController,public loadingCtrl:LoadingController,public messageService:MessageService,public utilisateurService:UtilisateurService) {

    this.sujet = navParams.get('sujet');

    this.contactForm = this._formBuilder.group({
      name: ['',Validators.compose([Validators.minLength(2),Validators.required])],
      email: ['',Validators.compose([Validators.maxLength(30), Validators.pattern("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"), Validators.required])],
      message: ['',Validators.compose([Validators.minLength(10), Validators.required])]
    });

  }

  ionViewDidLoad() {
    console.log('Hello ContactSujetPage Page');
  }

  sendMessage()
  {
    this.email=this.contactForm.value.email;
    this.name=this.contactForm.value.name;


    let contact={nom:this.name,email:this.email,message:this.contactForm.value.message};
    contact.sujet=this.sujet;
    console.log(contact);
    let loading = this.loadingCtrl.create({
    });
    loading.present();
    this.utilisateurService.sendMessageContact(contact).subscribe(res=>{
      if(res.success)
      {
        loading.dismiss();
        this.messageService.showAlert("Votre message a été envoyé","Contact");
      }
      else
      {

      }
    })

  }
}
