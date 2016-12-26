import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import {ArticleService} from '../../services/article.service';
import {GlobalsConstants} from "../../constants/globals.constants";
import {Article} from '../../components/article.component';


/*
  Generated class for the Favoris page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html'
})
export class FavorisPage {

  public articleFavorisExist:boolean=false;
  private loggedUser=JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED));
  public articles: Array<Article> = [];
  public articles1:Array<Article> = [];
  public articles2:Array<Article> = [];
  public url=GlobalsConstants.urlServer+GlobalsConstants.port+'/';
  public cheminImage=GlobalsConstants.cheminImage;
  constructor(public navCtrl: NavController,public articleService:ArticleService,public loadingCtrl:LoadingController) {

    let loading =this.loadingCtrl.create();
    loading.present();
    this.articleService.getFavoriteArticleByUser(this.loggedUser.id).subscribe(res=>{
      if(res.success)
      {
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
          loading.dismiss();
        }
        else
        {
          loading.dismiss();
        }
      }else
      {
        loading.dismiss();
        this.articleFavorisExist=false;
      }
    })
  }

  ionViewDidLoad() {
    console.log('Hello FavorisPage Page');
  }

}
