import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GlobalsConstants} from "../../constants/globals.constants";

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'login.html',
})
export class LoginModalPage {

  private title = GlobalsConstants.APPNAME;

  constructor(private navCtrl: NavController) {

  }

}
