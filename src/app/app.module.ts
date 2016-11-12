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
import {ProfilPage} from '../pages/profil/profil';
import {SearchResult} from "../pages/search-result/search-result";
import {CategorieDetailsPage} from "../pages/categorie-details/categorie-details";
import {ActiviteModalPage} from "../pages/activite/activite";
import {EditProfilModalPage} from "../pages/edit-profil/edit-profil";
import {MessageService} from '../services/message.service'
import {NouveautePresDeChezVousPage} from '../pages/nouveaute-pres-de-chez-vous/nouveaute-pres-de-chez-vous';


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
    SearchResult,
    signalerModalPage,
    LoginPage,
    ConnexionModalPage,
    TiteCapitalize,
    OccasStreetTimer,
    ResetPasswordModalPage,
    CategoriePage,
    ArticlesPopOver,
    SignupPage,
    ProfilPage,
    CategorieDetailsPage,
    ActiviteModalPage,
    EditProfilModalPage,
    NouveautePresDeChezVousPage
  ],
  imports: [
    IonicModule.forRoot(App,{
      monthNames: ['Janvier', 'F\u00e9vrier', 'Mars', 'Mai', 'Juin','Juillet','Ao\u00fbt','Septembre','Octobre','Novembre','D\u00e9cembre' ],
      monthShortNames: ['Janv.' , 'F\u00e9vr.' ,'Mars', 'Avr.','Mai','Juin', 'Juill.','Ao\u00fbt', 'Sept.' , 'Oct.' , 'Nov.' , 'Déc.' ],
      dayNames: ['Lundi', 'Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'],
      dayShortNames: ['Lun.', 'Mar.', 'Mer.', 'Jeu.','Ven.','Sam.','Dim.' ],
    })
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
    SearchResult,
    signalerModalPage,
    LoginPage,
    ConnexionModalPage,
    ResetPasswordModalPage,
    CategoriePage,
    ArticlesPopOver,
    SignupPage,
    ProfilPage,
    CategorieDetailsPage,
    ActiviteModalPage,
    EditProfilModalPage,
    NouveautePresDeChezVousPage
  ],
  providers: [ArticleService,UtilisateurService,CategorieService,MediaSharing,MessageService]
})
export class AppModule {}
