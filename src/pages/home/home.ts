import {Component} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {Article} from "../../components/article.component";
import {GlobalsConstants} from "../../constants/globals.constants";
import {NavController, NavParams, ModalController, ViewController, PopoverController} from "ionic-angular";
import {ArticleDetailsPage} from "../article-details/article-details";
import {searchModalPage} from "../search-articles/search-articles";



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
  public isSearch:boolean;
  private searchParams:Object;
  public searchChips = [];

  public prixOrder:string = 'croissants';
  public dateOrder:string = 'décroissantes';
  public url=GlobalsConstants.urlServer+GlobalsConstants.port+'/';
  public cheminImage=GlobalsConstants.cheminImage;
  public  images:any = [];


  constructor(private articleService:ArticleService,
              private navCtrl: NavController,
              private navParams: NavParams,
              private modalController : ModalController,
              private popoverCtrl: PopoverController) {

    this.getArticlesByLimit(this.skip,this.limit);
    this.loadImageArticle(this.skip,this.limitExplorer);
    this.homeTab="mur";

  }

  loadAll(){
    this.articleService.getAllArticles().subscribe(res => {
      //  let articles = res;

      // console.log("Article =>",articles)
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
      this.skip=this.skip+res.length;

      this.offLine = false;
      this.isSearch = false;

     this.presentArticle(res);

    },err =>{
      console.log('err',err);
      // watch network for a disconnect
      this.offLine = true;

    });
  }

  loadImageArticle(skip:number,limit:number){
    this.articleService.getArticlesByLimit(skip,limit).subscribe(res => {
      this.skipExplorer=this.skipExplorer+res.length;
      for(var i =0 ; i<res.length;i++)
      {
        console.log("images "+JSON.stringify(res[i]));
        if(res[i].images.length>0)
        {
          this.images.push({article:res[i],srcImage:this.url+this.cheminImage+res[i].images[0].cheminImage});
        }else
        {
          this.images.push({article:res[i],srcImage:null});
        }
      }
      this.images=this.shuffle(this.images);

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

    modal.onDidDismiss(data => {
      this.searchChips = [];
      console.log('MODAL DATA', data);
      this.searchParams = data;
      this.getChipsList(data);
      console.log( this.searchChips);

      this.articleService.getArticleByParam(data).subscribe((res) => {

        this.isSearch = true;
        this.presentArticle(res);

      });

    });
  }

  closeSearch(){
    this.skip=0;
    this.articles1 = [];
    this.articles2 = [];
    this.getArticlesByLimit(this.skip,GlobalsConstants.PAGE);
    this.isSearch = false;
  }

  doRefresh(refresher) {
    this.skip=0;
    this.articles1 = [];
    this.articles2 = [];
    if(this.isSearch){
      this.articleService.getArticleByParam(this.searchParams).subscribe((res) => {

        this.isSearch = true;
        this.presentArticle(res);
        refresher.complete();
      });
    }else {
      this.getArticlesByLimit(this.skip,GlobalsConstants.PAGE);
      refresher.complete();
    }

  }

  doRefreshImages(refresher) {
    this.images=[];
    this.skipExplorer=0;
    this.loadImageArticle(this.skipExplorer,GlobalsConstants.PAGEEXPLORER);
    refresher.complete();
  }

  doInfinite(infiniteScroll){
    if(this.isSearch){
      infiniteScroll.complete();
    }else {
      if(this.skip==0)
      {
        this.skip=GlobalsConstants.PAGE;
      }
      setTimeout(()=>{
        this.getArticlesByLimit(this.skip,this.limit+this.limit);
        infiniteScroll.complete();

      },1000);
    }

  }

  doInfiniteImages(infiniteScroll){
    if(this.skipExplorer==0)
    {
      this.skipExplorer=GlobalsConstants.PAGEEXPLORER;
    }
    setTimeout(()=>{
      this.loadImageArticle(this.skipExplorer,this.limitExplorer+this.limitExplorer);
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

  shuffle(array)
  {
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

  presentArticle(art:any){
    let articles = art;
    let tab1, tab2;
    // console.log(articles)
    if(art.length === 0) {

      this.articles1 = [];
      this.articles2 = [];

    }else if(art.length === 1){

      this.articles1.push(art[0]);

    }
    else if(art.length >= 2){
      tab1 = articles.splice(0,(articles.length/2));
      tab2 = articles;
      tab1.forEach(x => {
        this.articles1.push(x);
      });
      tab2.forEach(x => {
        this.articles2.push(x);
      });
    }
  }

  getChipsList(param:Object){
    Object.keys(param).forEach(key => {
      if(!(param[key] === '')){
         this.searchChips.push(param[key]);
      }
    });

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
