import {Injectable} from "@angular/core";
import {GlobalsConstants} from "../constants/globals.constants";
import {NavController, NavParams} from "ionic-angular";

@Injectable()
export abstract class AbstractLoggedPage {
  
  protected logged: boolean;
  protected loggedUser;
  protected nav;
  protected navParams;
  
  
  constructor(navCtrl?: NavController, navParams?: NavParams) {
    this.nav = navCtrl;
    this.navParams = navParams;
    this.loggedUser = JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED));
  }
  
  static checkLogin(): boolean {
    return !!localStorage.getItem("logged");
  }
  
  ionViewCanEnter(): boolean{
    if(AbstractLoggedPage.checkLogin()){
      this.initData();
      return true;
    } else {
      return false;
    }
  }
  
  abstract initData();
  
}
