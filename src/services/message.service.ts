/**
 * Created by fleundeu on 05/11/2016.
 */

import {Injectable} from '@angular/core'
import {GlobalsConstants} from "../constants/globals.constants";
import {Observable} from "rxjs/Observable";
import { ToastController, LoadingController,AlertController} from 'ionic-angular';



@Injectable()
export class MessageService{

  constructor(public alertCtrl:AlertController,public loadingCtrl:LoadingController,private toastCtrl: ToastController) {
  }

  showToast(message,title?)
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
