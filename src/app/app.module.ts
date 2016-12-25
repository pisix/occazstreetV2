import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { App } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import {HomePage, ArticlesPopOver} from '../pages/home/home';
import {ItemDetailsPage} from '../pages/item-details/item-details';
import {ArticleDetailsPage} from '../pages/article-details/article-details';
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
import {InvitezVosAmisPage} from '../pages/invitez-vos-amis/invitez-vos-amis';
import {ChatsPage} from '../pages/chats/chats';
import { MomentModule } from "angular2-moment";
import {MessagesPage} from '../pages/messages/messages'
import {ChatService} from '../services/chat.service'
import {CreateArticle} from "../pages/create-article/create-article";
import {ImageService} from "../services/image.service";
import {HelpPage} from '../pages/help/help';
import {ContactPage} from '../pages/contact/contact';
import {SecuritePage} from '../pages/securite/securite';
import {PolitiqueConfidentialitePage} from '../pages/politique-confidentialite/politique-confidentialite';
import {CguPage} from '../pages/cgu/cgu';
import {ContactSujetPage} from '../pages/contact-sujet/contact-sujet';
import {FavorisPage} from '../pages/favoris/favoris';

@NgModule({
  declarations: [
    App,
    AboutPage,
    ContactPage,
    HomePage,
    ItemDetailsPage,
    ArticleDetailsPage,
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
    NouveautePresDeChezVousPage,
    InvitezVosAmisPage,
    ChatsPage,
    MessagesPage,
    CreateArticle,
    InvitezVosAmisPage,
    HelpPage,
    ContactPage,
    PolitiqueConfidentialitePage,
    SecuritePage,
    CguPage,
    ContactSujetPage,
    FavorisPage
  ],
  imports: [
    IonicModule.forRoot(App,{
      monthNames: ['Janvier', 'F\u00e9vrier', 'Mars', 'Mai', 'Juin','Juillet','Ao\u00fbt','Septembre','Octobre','Novembre','D\u00e9cembre' ],
      monthShortNames: ['Janv.' , 'F\u00e9vr.' ,'Mars', 'Avr.','Mai','Juin', 'Juill.','Ao\u00fbt', 'Sept.' , 'Oct.' , 'Nov.' , 'Déc.' ],
      dayNames: ['Lundi', 'Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'],
      dayShortNames: ['Lun.', 'Mar.', 'Mer.', 'Jeu.','Ven.','Sam.','Dim.' ],
    }),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    AboutPage,
    ContactPage,
    HomePage,
    ItemDetailsPage,
    ArticleDetailsPage,
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
    NouveautePresDeChezVousPage,
    InvitezVosAmisPage,
    ChatsPage,
    MessagesPage,
    InvitezVosAmisPage,
    CreateArticle,
    HelpPage,
    ContactPage,
    PolitiqueConfidentialitePage,
    SecuritePage,
    CguPage,
    ContactSujetPage,
    FavorisPage
  ],
  providers: [ArticleService,ImageService,UtilisateurService,CategorieService,MediaSharing,MessageService,ChatService]
})
export class AppModule {}
