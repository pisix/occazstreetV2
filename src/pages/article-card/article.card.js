var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { GlobalsConstants } from "../../constants/globals.constants";
import { ArticleDetailsPage } from "../article-details/article-details";
import { ArticleService } from "../../services/article.service";
import { LoadingController, NavController } from "ionic-angular";
export var ArticleCard = (function () {
    function ArticleCard(articleService, loadingCtrl, navCtrl) {
        this.articleService = articleService;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.url = GlobalsConstants.urlServer + GlobalsConstants.port + '/';
        this.cheminImage = GlobalsConstants.cheminImage;
        this.openDetailsEventClick = new EventEmitter();
    }
    ArticleCard.prototype.articleDetails = function (article) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.articleService.updateNumberView(article).subscribe(function (res) {
            loading.dismiss();
            article.nombreDeVue = res.article.nombreDeVue;
            try {
                _this.navCtrl.push(ArticleDetailsPage, {
                    article: article
                });
            }
            catch (e) {
                console.log(e);
            }
        });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ArticleCard.prototype, "article", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], ArticleCard.prototype, "openDetailsEventClick", void 0);
    ArticleCard = __decorate([
        Component({
            selector: 'article-card',
            templateUrl: 'articleCard.html'
        }), 
        __metadata('design:paramtypes', [ArticleService, LoadingController, NavController])
    ], ArticleCard);
    return ArticleCard;
}());
//# sourceMappingURL=article.card.js.map