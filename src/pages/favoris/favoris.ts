import {Component} from '@angular/core';
import {NavController, LoadingController, NavParams} from 'ionic-angular';
import {ArticleService} from '../../services/article.service';
import {GlobalsConstants} from "../../constants/globals.constants";
import {Article} from '../../components/article.component';
import {AbstractLoggedPage} from "../abstratLoggedPage";

@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html'
})
export class FavorisPage extends AbstractLoggedPage {

  public articleFavorisExist:boolean=false;
  public articles: Array<Article> = [];
  public articles1:Array<Article> = [];
  public articles2:Array<Article> = [];
  public url=GlobalsConstants.urlServer+GlobalsConstants.port+'/';
  public cheminImage=GlobalsConstants.cheminImage;
  private loading;

  constructor(protected navCtrl: NavController, protected navParams: NavParams, public articleService:ArticleService,public loadingCtrl:LoadingController) {
    super();
  }

  ionViewDidLoad() {
    console.log('Hello FavorisPage Page');
  }

  initData() {
    this.loading =this.loadingCtrl.create();
    this.loading.present();
    this.articleService.getFavoriteArticleByUser(this.loggedUser.id).subscribe(res=>{
      if(res.success)
      {
        debugger;
        if(res.articles.length>0)
        {
          this.articleFavorisExist=true;

          res.articles.forEach((article)=> {
            this.articles.push(article);
          });
          let tab1, tab2;
          // console.log(articles)
          tab1 = this.articles.splice(0,(this.articles.length/2));
          tab2 = this.articles;
          tab1.forEach(x => {
            this.articles1.push(x);
          });
          tab2.forEach(x => {
            this.articles2.push(x);
          });
          this.loading.dismiss();
        }
        else
        {
          this.loading.dismiss();
        }
      }else
      {
        this.loading.dismiss();
        this.articleFavorisExist=false;
      }
    })
  }
}
