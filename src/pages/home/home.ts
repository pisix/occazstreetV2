import {Component} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {Article} from "../../components/article.component";
import {GlobalsConstants} from "../../constants/globals.constants";
import {NavController, NavParams, ModalController, ViewController, PopoverController} from "ionic-angular";
import {ArticleDetailsPage} from "../article-details/article-details";
import {searchModalPage} from "../search-articles/search-articles";
import {OccasStreetTimer} from "../../pipes/timer.pipe";
import {TiteCapitalize} from "../../pipes/article-titre.pipe";


@Component({
  selector:'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public title = GlobalsConstants.APPNAME;
    private skip = 0;
    private limit = GlobalsConstants.PAGE;

    public articles1:Array<Article> = [];
    public articles2:Array<Article> = [];
    private offLine:boolean;

    public prixOrder:string = 'croissants';
    public dateOrder:string = 'décroissantes';
    public url=GlobalsConstants.urlServer+GlobalsConstants.port+'/';
    public cheminImage=GlobalsConstants.cheminImage;


  constructor(private articleService:ArticleService,
              private navCtrl: NavController,
              private navParams: NavParams,
              private modalController : ModalController,
              private popoverCtrl: PopoverController) {

    this.getArticlesByLimit(this.skip,this.limit);

  }

  loadAll(){
    this.articleService.getAllArticles().subscribe(res => {
      let articles = res;

      // console.log("Article =>",articles)
    })


  }

  getArticlesByLimit(skip:number,limit:number){

    this.articleService.getArticlesByLimit(skip,limit).subscribe(res => {
      this.offLine = false;

      let articles = res;
      let tab1, tab2;
      // console.log(articles)
      tab1 = articles.splice(0,(articles.length/2));
      tab2 = articles;
      tab1.forEach(x => {
        this.articles1.push(x);
      });
      tab2.forEach(x => {
        this.articles2.push(x);
      });

    },err =>{
      console.log('err',err);
      // watch network for a disconnect
      this.offLine = true;

    });
  }

  articleDetails(event,item:Article){
    this.navCtrl.push(ArticleDetailsPage, {
      article: item
    });
  }


  searchArticle() {
    let modal = this.modalController.create(searchModalPage);
    modal.present();
  }

  doRefresh(refresher) {
    this.articles1 = [];
    this.articles2 = [];
    this.getArticlesByLimit(this.skip,this.limit);
    refresher.complete();

  }

  doInfinite(infiniteScroll){
    this.skip = this.limit;
    this.limit +=6;
    setTimeout(()=>{
      this.getArticlesByLimit(this.skip,this.limit);
      infiniteScroll.complete();

    },1000);
  }

  option(myEvent){

    let popover = this.popoverCtrl.create(articlesPopOver,{prixOrder:this.prixOrder,dateOrder:this.dateOrder});
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data => {
      this.dateOrder = data.dateOrder;
      this.prixOrder = data.prixOrder
    })
  }
}

@Component({
  template: `<ion-list no-margin>
                <ion-item  (click)="trierParPix(prixOrder)">
                   prix {{prixOrder}}
                </ion-item>
                <ion-item  (click)="trierParDate(dateOrder)">
                   Date {{dateOrder}}
                </ion-item>
             </ion-list>`
})
class articlesPopOver {
  private prixOrder:string;
  private dateOrder:string;

  constructor(private viewCtrl: ViewController,navParams: NavParams) {
    this.dateOrder = navParams.get('dateOrder');
    this.prixOrder = navParams.get('prixOrder');
  }

  trierParPix(order:string){
    console.log("trier par prix "+order)
    this.prixOrder = this.prixOrder === 'croissants'?'décroissants':'croissants';
    this.viewCtrl.dismiss({prixOrder:this.prixOrder,dateOrder:this.dateOrder});
  }

  trierParDate(order:string){
    console.log("trier par date "+order)
    this.dateOrder = this.dateOrder === 'décroissantes'?'croissantes':'décroissantes';
    this.viewCtrl.dismiss({prixOrder:this.prixOrder,dateOrder:this.dateOrder});
  }
  close() {
    this.viewCtrl.dismiss({prixOrder:this.prixOrder,dateOrder:this.dateOrder});
  }
}
