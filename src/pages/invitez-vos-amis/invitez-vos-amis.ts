import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MediaSharing} from '../../services/mediaSharing.service';
import {GlobalsConstants} from '../../constants/globals.constants';

/*
  Generated class for the InvitezVosAmis page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-invitez-vos-amis',
  templateUrl: 'invitez-vos-amis.html'
})
export class InvitezVosAmisPage {
  message;

  constructor(public navCtrl: NavController,public mediaSharing:MediaSharing) {
    this.message="je t'invite à telecharger l'application "+ GlobalsConstants.APPNAME +", elle est juste trop bien !!! :) "+GlobalsConstants.APPPLAYSTORE;

  }

  ionViewDidLoad() {
    console.log('Hello InvitezVosAmis Page');
  }



  inviteInstagram()
  {
    this.mediaSharing.shareViaInstagram(this.message)
  }

  inviteWhatsapp()
  {
    this.mediaSharing.shareViaWhatsApp(this.message,null,GlobalsConstants.WEBSITE);
  }
  inviteMail()
  {
    let subjectMail="Invitation à découvrir Occazstreet";
    this.mediaSharing.shareViaEmail(this.message,subjectMail)
  }
  inviteFacebook()
  {
    this.mediaSharing.shareViaFacebook(this.message,null,GlobalsConstants.WEBSITE)
  }

  inviteTwitter()
  {
    this.mediaSharing.shareTwitter(this.message,null,GlobalsConstants.WEBSITE);
  }

}
