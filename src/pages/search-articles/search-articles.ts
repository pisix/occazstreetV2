/**
 * Created by root on 11/08/16.
 */

import {Component} from '@angular/core'
import {NavParams, ViewController} from "ionic-angular";

@Component({
  selector: 'page-search-articles',
  templateUrl: 'search-articles.html'
})
export class searchModalPage{
  public myInput:any;

  constructor(private params: NavParams,
              private viewCtrl: ViewController){}


  Cancel(){

  }

  onInput(event){

  }

  onCancel(event){

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
