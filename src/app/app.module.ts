
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { App } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import {HomePage, ArticlesPopOver} from '../pages/home/home';
import {ItemDetailsPage} from '../pages/item-details/item-details';
import {ArticleDetailsPage} from '../pages/article-details/article-details';
import {ListPage} from '../pages/list/list'
import {searchModalPage} from '../pages/search-articles/search-articles';
import {signalerModalPage} from '../pages/signaler-article/signaler-article';
import {LoginPage} from '../pages/login/login';
import {ConnexionModalPage} from '../pages/connexion/connexion';
import {ResetPasswordModalPage} from '../pages/reset-password/reset-password';
import {TiteCapitalize} from '../pipes/article-titre.pipe';
import {OccasStreetTimer} from '../pipes/timer.pipe';
import {ArticleService} from '../services/article.service';
import {UtilisateurService} from '../services/utilisateur.service';
import {CategoriePage} from '../pages/categorie/categorie';
import {CategorieService}  from '../services/categorie.service';
import {SignupPage} from '../pages/signup/signup';
import {MediaSharing} from "../services/mediaSharing.service";
import {ArticleList} from "../components/article.list.component/article.list.component";
import {SearchResult} from "../pages/search-result/search-result";




@NgModule({
  declarations: [
    App,
    AboutPage,
    ContactPage,
    HomePage,
    SearchResult,
    ItemDetailsPage,
    ArticleDetailsPage,
    ListPage,
    searchModalPage,
    signalerModalPage,
    LoginPage,
    ConnexionModalPage,
    TiteCapitalize,
    OccasStreetTimer,
    ResetPasswordModalPage,
    CategoriePage,
    ArticlesPopOver,
    SignupPage
  ],
  imports: [
    IonicModule.forRoot(App)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    AboutPage,
    ContactPage,
    HomePage,
    SearchResult,
    ItemDetailsPage,
    ArticleDetailsPage,
    ListPage,
    searchModalPage,
    signalerModalPage,
    LoginPage,
    ConnexionModalPage,
    ResetPasswordModalPage,
    CategoriePage,
    ArticlesPopOver,
    SignupPage
  ],
  providers: [ArticleService,UtilisateurService,CategorieService,MediaSharing]
})
export class AppModule {}

