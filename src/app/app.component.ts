import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav,Events, AlertController,LoadingController } from 'ionic-angular';
import {StatusBar,Push,Splashscreen,Badge,Network,InAppBrowser} from 'ionic-native';
import {HomePage} from '../pages/home/home';
import {HelpPage} from '../pages/help/help';
import {CategoriePage} from '../pages/categorie/categorie';
import {LoginPage} from '../pages/login/login';
import {MessagesPage} from '../pages/messages/messages';
import {ArticleDetailsPage} from '../pages/article-details/article-details';
import {GlobalsConstants} from "../constants/globals.constants";
import {ProfilPage} from '../pages/profil/profil';
import {NouveautePresDeChezVousPage} from '../pages/nouveaute-pres-de-chez-vous/nouveaute-pres-de-chez-vous';
import {InvitezVosAmisPage} from '../pages/invitez-vos-amis/invitez-vos-amis';
import {ChatsPage} from '../pages/chats/chats';
import {FavorisPage} from '../pages/favoris/favoris';
import {UtilisateurService} from '../services/utilisateur.service';
import {TranslateService} from "ng2-translate";
import {Page} from "../components/page.component";
import {MediaSharing} from "../services/mediaSharing.service";


declare var NotificationEventAdditionalData;
declare var pushInfo;




@Component({
  templateUrl: 'app.html'
})
export class App {
  @ViewChild(Nav) nav: Nav;
  // make HelloIonicPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<Page>;
  public logged:boolean ;
  public  connected=false;
  public infoLoggedUser;
  public loginPage={component: LoginPage};

  public url=GlobalsConstants.urlServer+GlobalsConstants.port+'/';
  public cheminPhoto=GlobalsConstants.cheminPhoto;
  public version=GlobalsConstants.VERSION;
  public appstore=GlobalsConstants.APPPLAYSTORE;


  constructor(
    public platform: Platform,
    public menu: MenuController,
    public events:Events,
    public translate:TranslateService,
    public alertCtrl:AlertController,
    public utilisateurService:UtilisateurService,
    public loadingCtrl:LoadingController,
    public mediaSharing:MediaSharing
  ) {

    // watch network for a disconnect
    let disconnectSubscription = Network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });

    // stop disconnect watch
    disconnectSubscription.unsubscribe();


    // watch network for a connection
    let connectSubscription = Network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type.  Might need to wait 
      // prior to doing any api requests as well.
    });

   // stop connect watch




    let loading = this.loadingCtrl.create();
    loading.present();
    this.initializeApp();

    this.translate.setDefaultLang('en');
    this.translate.use(this.getUserLanguage());

    if(localStorage.getItem("logged"))
    {
      this.infoLoggedUser=JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED));
      this.logged=true;
    }else
    {
      this.logged=false;
    }

    events.subscribe('user:logged-data',(userEventData)=> {
      localStorage.setItem(GlobalsConstants.USER_LOGGED, JSON.stringify(userEventData));
      console.log(userEventData);
      this.infoLoggedUser = userEventData;
    });
    events.subscribe('user:logged',(eventData)=>{
      localStorage.setItem("logged", 'true');
      this.logged=true;
    });


    // set our app's pages
    this.pages = [
      new Page('menu.home',HomePage,'home'),
      new Page('menu.messages',ChatsPage,'chatbubbles'),
      new Page('menu.categories',CategoriePage,'list-box'),
      new Page('menu.aroundYou',NouveautePresDeChezVousPage,'locate'),
      new Page('menu.favorite',FavorisPage,'heart'),
      new Page('menu.inviteFriends',InvitezVosAmisPage,'people'),
      new Page('menu.help',HelpPage,'information-circle'),
    ];

    loading.dismiss();

  }

  public getUserLanguage():string{
    let  userLang:string = GlobalsConstants.SUPPORTEDLANGUAGES[navigator.language];
    return  typeof userLang === "string"?userLang:GlobalsConstants.SUPPORTEDLANGUAGES["default"];
  }

  initializeApp() {

    this.addConnectivityListeners();
    this.platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
       let push = Push.init({
         android: {
          // (old)senderID: "860269311689"
           senderID:"662729627350"
        },

         ios: {
           senderID: "662729627350",
           alert: "true",
           badge: false,
           sound: "true"
         },
         windows: {}
       });

       push.on('registration', (data) => {
         //TODO - send device token to server
         let tokenData={deviceToken:data.registrationId,idUtilisateur:JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED))?JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED)).id:''};
        // alert(JSON.stringify(tokenData));
         this.utilisateurService.registerToken(tokenData).subscribe(res=>{

         })
       });
       push.on('notification', (push) => {
         let self = this;
         //if user using app and push notification comes
         if (push.additionalData.foreground) {
           // if application open, show popup
           let confirmAlert = this.alertCtrl.create({
             title: push.additionalData['pushInfo'].title,
             message: push.additionalData['pushInfo'].body,
             buttons: [{
               text: 'Ignorer',
               role: 'cancel'
             }, {
               text: 'Voir',
               handler: () => {
                 //TODO: Your logic here
                 if(push.additionalData['pushInfo'].type=='newMessage')
                 {
                   self.nav.push(ChatsPage);
                 }
                 if(push.additionalData['pushInfo'].type=='newArticle')
                 {
                   self.nav.push(ArticleDetailsPage, {
                     article: push.additionalData['data']
                   });
                 }
                 if(push.additionalData['pushInfo'].type=='newPrice')
                 {

                 }
               }
             }]
           });
           confirmAlert.present();
        } else {
           //if user NOT using app and push notification comes
      //     //TODO: Your logic on click of push notification directly
           if(push.additionalData['pushInfo'].type=='newMessage')
           {
             self.nav.push(MessagesPage, push.additionalData['data']);
           }
           if(push.additionalData['pushInfo'].type=='newArticle')
           {
             Badge.increase(1);
             self.nav.push(ArticleDetailsPage, {
               article: push.additionalData['data']
             });
           }
           if(push.additionalData['pushInfo'].type=='newPrice')
           {

           }
         }
       });
       push.on('error', (e) => {
         console.log(e.message);
       });
    });
  }
  menuClose()
  {
    this.menu.close();
  }
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    if(page.component==ChatsPage)
    {
      if(this.logged)
      {
        this.nav.push(page.component);
      }
      else
      {
        this.nav.push(LoginPage,{message:"messLoginIfNotConnected"});
      }

    }
    else if(page.component==FavorisPage)
    {
      if(this.logged)
      {
        this.nav.push(page.component);
      }
      else
      {
        this.nav.push(LoginPage,{message:"favLoginIfNotConnected"});
      }

    }

    else if(page.component==HomePage)
    {
      this.nav.setRoot(page.component);
    }
    else
    {
      this.nav.push(page.component);

    }
  }

  doLogout()
  {
    this.menu.close();
    this.nav.setRoot(this.rootPage);
    localStorage.removeItem(GlobalsConstants.USER_LOGGED);
    localStorage.removeItem("logged");
    this.logged=false;
  }

  profil()
  {
    this.menu.close();
    this.nav.setRoot(ProfilPage,{user:localStorage.getItem(GlobalsConstants.USER_LOGGED)});
  }

  /*Connectivity listener to check device connectivity*/
  addConnectivityListeners(){
    let onOnline = () => {
      this.events.publish('network',{state:'on'});
    };
    let onOffline = () => {
      this.events.publish('network',{state:'off'});
    };
    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
  }

  marksApp()
  {
    let browser = new InAppBrowser(GlobalsConstants.APPPLAYSTORE, '_system');

  }

  shareWhatsapp()
  {
    let message="je t'invite à telecharger l'application "+ GlobalsConstants.APPNAME +", elle est juste trop bien !!! :) "+GlobalsConstants.APPPLAYSTORE;
    this.mediaSharing.shareViaWhatsApp(message,null,GlobalsConstants.WEBSITE);
  }
}
