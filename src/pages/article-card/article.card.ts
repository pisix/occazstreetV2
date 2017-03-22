import {Component, Input, Output, EventEmitter} from "@angular/core";
import {GlobalsConstants} from "../../constants/globals.constants";
import {ArticleDetailsPage} from "../article-details/article-details";
import {ArticleService} from "../../services/article.service";
import {LoadingController, NavController} from "ionic-angular";


@Component({
  selector: 'article-card',
  templateUrl: 'articleCard.html'
})
export class ArticleCard {

  public url = GlobalsConstants.urlServer + GlobalsConstants.port + '/';
  public cheminImage = GlobalsConstants.cheminImage;

  @Input() article: any;

  @Output() openDetailsEventClick = new EventEmitter();

  constructor(private articleService: ArticleService, private loadingCtrl: LoadingController,private navCtrl: NavController,) {
  }

  articleDetails(article) {

    this.articleService.updateNumberView(article).subscribe(res => {
      article.nombreDeVue = res.article.nombreDeVue;
      try {
        this.navCtrl.push(ArticleDetailsPage, {
          article: article
        });
      }catch (e){
        console.log(e);
      }

    })
  }
}
