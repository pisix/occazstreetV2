import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController, ViewController, ModalController} from 'ionic-angular';
import {Article} from "../../components/article.component";
import {GoogleMap, GoogleMapsEvent} from "ionic-native";
import {signalerModalPage} from "../signaler-article/signaler-article";
import {TiteCapitalize} from "../../pipes/article-titre.pipe";
import {OccasStreetTimer} from "../../pipes/timer.pipe";
import {GlobalsConstants} from "../../constants/globals.constants";



@Component({
    selector:'page-article-details',
  templateUrl: 'article-details.html'
})
export class ArticleDetailsPage {
  public article: Article;
  public map;
    public url=GlobalsConstants.urlServer+GlobalsConstants.port+'/';
    public cheminImage=GlobalsConstants.cheminImage;

  private PopoverOptions = {
    cssClass:'',
    showBackdrop:true,
    enableBackdropDismiss:true
  };

  constructor(private navCtrl: NavController,
              navParams: NavParams,
              private popoverCtrl: PopoverController) {

    // If we navigated to this page, we will have an item available as a nav param
    this.article = navParams.get('article');
    // this.map = new GoogleMap('article-details-map',{
    //
    // });
    // this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => console.log('Map is ready!'));
    console.log(this.article)

  }


  option(myEvent){
    let popover = this.popoverCtrl.create(articleDetailtPopOver,{},this.PopoverOptions);
    popover.present({
      ev: myEvent
    });
  }
}

@Component({
  template: '<p text-center (click)="close()">Signaler</p>'
})
class articleDetailtPopOver {
  constructor(private viewCtrl: ViewController,private modalController : ModalController) {}

  close() {
    let modal = this.modalController.create(signalerModalPage);
    modal.present();

    console.log("Je signale");
    this.viewCtrl.dismiss();
  }
}
