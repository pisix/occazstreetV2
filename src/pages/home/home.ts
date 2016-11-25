import {Component} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {Article} from "../../components/article.component";
import {GlobalsConstants} from "../../constants/globals.constants";
import {NavController, NavParams, ModalController, ViewController, PopoverController} from "ionic-angular";
import {ArticleDetailsPage} from "../article-details/article-details";
import {searchModalPage} from "../search-articles/search-articles";
import {SearchResult} from "../search-result/search-result";
import {CreateArticle} from "../create-article/create-article";



@Component({
  selector:'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public homeTab;
  public title = GlobalsConstants.APPNAME;
  private skip = 0;
  private skipExplorer = 0;
  private limit = GlobalsConstants.PAGE;
  private limitExplorer=GlobalsConstants.PAGEEXPLORER;
  public articles1:Array<Article> = [];
  public articles2:Array<Article> = [];
  private offLine:boolean;

  public prixOrder:string = 'croissants';
  public dateOrder:string = 'décroissantes';
  public url=GlobalsConstants.urlServer+GlobalsConstants.port+'/';
  public cheminImage=GlobalsConstants.cheminImage;
  public  images:any = [];
  public numbreAnnonces;


  constructor(private articleService:ArticleService,
              private navCtrl: NavController,
              private navParams: NavParams,
              private modalController : ModalController,
              private popoverCtrl: PopoverController) {

    this.getArticlesByLimit(this.skip,this.limit);
    this.loadAll();
    // this.loadImageArticle(this.skip,this.limitExplorer);
    this.homeTab="mur";

  }

  loadAll(){
    this.articleService.getAllArticles().subscribe(res => {
      //  let articles = res;

      // console.log("Article =>",articles)
      this.numbreAnnonces=res.length;
    })


  }

  selectedMur(){
    this.homeTab="mur";
  }
  selectedExplorer(){
    this.homeTab="explorer";
  }
  selectedCollections(){
    this.homeTab="collections";
  }

  getArticlesByLimit(skip:number,limit:number){
    this.articleService.getArticlesByLimit(skip,limit).subscribe(res => {

      this.loadImageArticle(res);

      this.skip=this.skip+res.length;

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

  loadImageArticle(res:any){
    this.skipExplorer=this.skipExplorer+res.length;
    for(var i =0 ; i<res.length;i++)
    {
      if(res[i].images.length>0)
      {
        this.images.push({article:res[i],srcImage:this.url+this.cheminImage+res[i].images[0].cheminImage});
      }else
      {
        this.images.push({article:res[i],srcImage:null});
      }
    }
    this.images=this.shuffle(this.images);
  }

  articleDetails(event,item:Article){
    this.navCtrl.push(ArticleDetailsPage, {
      article: item
    });
  }

  addNewArticle(){
    this.navCtrl.push(CreateArticle);
  }


  searchArticle() {
    let modal = this.modalController.create(searchModalPage);
    modal.present();

    modal.onDidDismiss(data => {
      console.log('MODAL DATA', data);
      this.navCtrl.push(SearchResult, {
        searchParam: data
      });

    });
  }


  doRefresh(refresher) {
    this.skip=0;
    this.articles1 = [];
    this.articles2 = [];
    this.getArticlesByLimit(this.skip,GlobalsConstants.PAGE);
    refresher.complete();
  }

  doRefreshImages(refresher) {
    this.images=[];
    this.skipExplorer=0;
    // this.loadImageArticle(this.skipExplorer,GlobalsConstants.PAGEEXPLORER);
    refresher.complete();
  }

  doInfinite(infiniteScroll){
    if(this.skip==0)
    {
      this.skip=GlobalsConstants.PAGE;
    }
    setTimeout(()=>{
      this.getArticlesByLimit(this.skip,this.limit+this.limit);
      infiniteScroll.complete();

    },1000);
  }

  doInfiniteImages(infiniteScroll){
    if(this.skipExplorer==0)
    {
      this.skipExplorer=GlobalsConstants.PAGEEXPLORER;
    }
    setTimeout(()=>{
      // this.loadImageArticle(this.skipExplorer,this.limitExplorer+this.limitExplorer);
      infiniteScroll.complete();

    },1000);
  }

  option(myEvent){

    let popover = this.popoverCtrl.create(ArticlesPopOver,{prixOrder:this.prixOrder,dateOrder:this.dateOrder});
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data => {
      this.dateOrder = data.dateOrder;
      this.prixOrder = data.prixOrder
    })
  }

  shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle?
    while (m) {

      // Pick a remaining element?
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
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
             </ion-list>`,
})
export class ArticlesPopOver {
  public prixOrder:string;
  public dateOrder:string;

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
