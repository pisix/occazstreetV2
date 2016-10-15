import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { App } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import {ItemDetailsPage} from '../pages/item-details/item-details';
import {ArticleDetailsPage} from '../pages/article-details/article-details';
import {ListPage} from '../pages/list/list'
import {searchModalPage} from '../pages/search-articles/search-articles';
import {signalerModalPage} from '../pages/signaler-article/signaler-article';
import {LoginPage} from '../pages/login/login'
import {TiteCapitalize} from '../pipes/article-titre.pipe';
import {OccasStreetTimer} from '../pipes/timer.pipe';
/*import {Article} from '../components/article.component';
import {Categorie} from '../components/categorie.component';
import {Devise} from '../components/devise.component';
import {Utilisateur} from '../components/utilisateur.component';*/
import {ArticleService} from '../services/article.service';
import {MediaSharing} from "../services/mediaSharing.service";
import {ResetPasswordModalPage} from "../pages/reset-password/reset-password";
import {ConnexionModalPage} from "../pages/connexion/connexion";



@NgModule({
  declarations: [
    App,
    AboutPage,
    ContactPage,
    HomePage,
    ItemDetailsPage,
    ArticleDetailsPage,
    ListPage,
    searchModalPage,
    signalerModalPage,
    ResetPasswordModalPage,
    ConnexionModalPage,
    LoginPage,
    TiteCapitalize,
    OccasStreetTimer
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
    ItemDetailsPage,
    ArticleDetailsPage,
    ListPage,
    searchModalPage,
    ResetPasswordModalPage,
    ConnexionModalPage,
    signalerModalPage,
    LoginPage
  ],
  providers: [ArticleService,MediaSharing]
})
export class AppModule {}
