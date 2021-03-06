import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {Article} from "../../components/article.component";
import {GlobalsConstants} from "../../constants/globals.constants";
import {NavController, NavParams, ModalController, PopoverController,LoadingController} from "ionic-angular";
import {ArticleDetailsPage} from "../article-details/article-details";
import {searchModalPage} from "../search-articles/search-articles";
import {HomePage, ArticlesPopOver} from "../home/home";



@Component({
  selector:'search-result',
  templateUrl: 'search-result.html'
})
export class SearchResult implements OnInit{

  public homeTab;
  public title = GlobalsConstants.APPNAME;

  public articles1:Array<Article> = [];
  public articles2:Array<Article> = [];
  private param;
  public offLine:boolean;
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
              private popoverCtrl: PopoverController,public loadingCtrl:LoadingController) {
    let param = navParams.get('searchParam');
    this.param = param;
  }


   ngOnInit(): void {
     this.param.libellecategorie=localStorage.getItem('libelleCategorie');
     this.getArticleByParam(this.param);
     this.getChipsList(this.param);
  }

  getArticleByParam(param){
    this.articleService.getArticleByParam(param).subscribe(res => {
      // this.loadImageArticle(res);

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


  searchArticle() {
    let modal = this.modalController.create(searchModalPage);
    modal.present();

    modal.onDidDismiss(data =>{
      this.searchChips = [];
      this.getChipsList(data);
      this.getArticleByParam(data);
    })
  }

  doRefresh(refresher) {
    this.articles1 = [];
    this.articles2 = [];
    this.getArticleByParam(this.param);
    refresher.complete();
  }


  // doInfinite(infiniteScroll){
  //   if(this.skip==0)
  //   {
  //     this.skip=GlobalsConstants.PAGE;
  //   }
  //   setTimeout(()=>{
  //     this.getArticlesByLimit(this.skip,this.limit+this.limit);
  //     infiniteScroll.complete();
  //
  //   },1000);
  // }

  // doInfiniteImages(infiniteScroll){
  //   if(this.skipExplorer==0)
  //   {
  //     this.skipExplorer=GlobalsConstants.PAGEEXPLORER;
  //   }
  //   setTimeout(()=>{
  //     this.loadImageArticle(this.skipExplorer,this.limitExplorer+this.limitExplorer);
  //     infiniteScroll.complete();
  //
  //   },1000);
  // }

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


  remove(p:string,event){

    Object.keys(this.param).forEach(key=>{
      if (this.param[key] === p){
        this.param[key] = "";
        return;
      }
    });

    this.searchChips.forEach((k,idx) =>{
      if(k === p){
        this.searchChips.splice(idx,1);
      }
    });

    // if chips array is empty we redirect to the home page
    if(this.searchChips.length == 0){
      this.navCtrl.pop(HomePage);

    }else {
      // else we query a new search with the new params
      let loading=this.loadingCtrl.create();
      loading.present();
      this.getArticleByParam(this.param);
      loading.dismiss();
    }

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

  getChipsList(param:Object){
    Object.keys(param).forEach(key => {
      if(!(param[key] === '' )){
        if(key!="categorie")
        {
          this.searchChips.push(param[key]);
        }

      }
    });

  }


}

