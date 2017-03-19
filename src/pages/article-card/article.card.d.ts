import { EventEmitter } from "@angular/core";
import { ArticleService } from "../../services/article.service";
import { LoadingController, NavController } from "ionic-angular";
export declare class ArticleCard {
    private articleService;
    private loadingCtrl;
    private navCtrl;
    url: string;
    cheminImage: string;
    article: any;
    openDetailsEventClick: EventEmitter<{}>;
    constructor(articleService: ArticleService, loadingCtrl: LoadingController, navCtrl: NavController);
    articleDetails(article: any): void;
}
