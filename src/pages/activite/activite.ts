import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import {UtilisateurService} from '../../services/utilisateur.service'

/*
  Generated class for the Activite page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-activite',
  templateUrl: 'activite.html'
})
export class ActiviteModalPage {

  public userActivity;
  constructor(public navCtrl: NavController,private navParams:NavParams,public utilisateurService:UtilisateurService, private viewCtrl: ViewController)
   {
    let idUser=this.navParams.get('idutilisateur');
    this.utilisateurService.getUserActivity(idUser).subscribe(res=>{

      if(res.success)
      {
        this.userActivity=res.activiteUser;
        console.log(JSON.stringify(this.userActivity));
      }else
      {

      }
    })
  }


  ionViewDidLoad() {
    console.log('Hello Activite Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
