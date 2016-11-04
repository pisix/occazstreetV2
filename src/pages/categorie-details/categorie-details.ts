import { Component } from '@angular/core';
import { NavController,NavParams, ToastController} from 'ionic-angular';
import {ArticleService} from '../../services/article.service';
import {MessagesConstants} from '../../constants/messages.constants';
import {GlobalsConstants} from '../../constants/globals.constants';
import {ArticleDetailsPage} from '../article-details/article-details';
import {Article}  from '../../components/article.component';
import {Categorie} from '../../components/categorie.component';
/*
 Generated class for the CategorieDetails page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-categorie-details',
  templateUrl: 'categorie-details.html'
})
export class CategorieDetailsPage {

  public categorie:Categorie;
  public articleCategorie;
  public articles1:Array<Article> = [];
  public articles2:Array<Article> = [];
  public offLine;
  public url=GlobalsConstants.urlServer+GlobalsConstants.port+'/';
  public cheminImage=GlobalsConstants.cheminImage;
  public hasArticle;
  constructor(public navCtrl: NavController,navParams: NavParams,public  articleService:ArticleService,public toastCtrl:ToastController
  ) {
    this.categorie=navParams.get('categorie');
    articleService.getArticleByCategorie(this.categorie.idCategorie).subscribe(res=>{
      this.hasArticle=res.hasArticle;
      if(res)
      {
        this.offLine=false;
        let articles = res.articles;
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
      }else
      {

      }
    },err =>{
      console.log('err',err);
      // watch network for a disconnect
      this.showToast(MessagesConstants.erreurServeur);
      this.offLine = true;


    })


  }

  ionViewDidLoad() {
  }
  showToast(message)
  {


    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  articleDetails(event,item:Article){
    this.navCtrl.push(ArticleDetailsPage, {
      article: item
    });
  }
}
