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
import {LoginModalPage} from '../pages/login/login'
import {TiteCapitalize} from '../pipes/article-titre.pipe';
import {OccasStreetTimer} from '../pipes/timer.pipe';
/*import {Article} from '../components/article.component';
import {Categorie} from '../components/categorie.component';
import {Devise} from '../components/devise.component';
import {Utilisateur} from '../components/utilisateur.component';*/
import {ArticleService} from '../services/article.service';



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
    LoginModalPage,
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
    signalerModalPage,
    LoginModalPage
  ],
  providers: [ArticleService]
})
export class AppModule {}
