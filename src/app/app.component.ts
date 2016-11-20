import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav,Events, AlertController } from 'ionic-angular';
import {StatusBar,Push,Splashscreen} from 'ionic-native';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {CategoriePage} from '../pages/categorie/categorie';
import {LoginPage} from '../pages/login/login';
import {GlobalsConstants} from "../constants/globals.constants";
import {ProfilPage} from '../pages/profil/profil';
import {NouveautePresDeChezVousPage} from '../pages/nouveaute-pres-de-chez-vous/nouveaute-pres-de-chez-vous';
import {InvitezVosAmisPage} from '../pages/invitez-vos-amis/invitez-vos-amis';
import {ChatsPage} from '../pages/chats/chats';
import {UtilisateurService} from '../services/utilisateur.service';
import {MessagesPage} from '../pages/messages/messages';
import {ArticleDetailsPage} from '../pages/article-details/article-details';
declare var NotificationEventAdditionalData;
declare var pushInfo;



@Component({
  templateUrl: 'app.html'
})
export class App {
  @ViewChild(Nav) nav: Nav;
  // make HelloIonicPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any,icon:any}>;
  public logged:boolean =false;
  public  connected=false;
  public infoLoggedUser;
  public loginPage={component: LoginPage}

  public url=GlobalsConstants.urlServer+GlobalsConstants.port+'/';
  public cheminPhoto=GlobalsConstants.cheminPhoto;


  constructor(
    public platform: Platform,
    public menu: MenuController,
    public events:Events,
    public alertCtrl:AlertController,
    public utilisateurService:UtilisateurService
  ) {
    this.initializeApp();

    this.infoLoggedUser=JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED));
    if(localStorage.getItem("logged"))
    {
      this.logged=true;
    }else
    {
      this.logged=false;
    }

    events.subscribe('user:logged-data',(userEventData)=> {
      localStorage.setItem(GlobalsConstants.USER_LOGGED, JSON.stringify(userEventData[0]));
      console.log(userEventData[0]);
      this.infoLoggedUser = userEventData[0];
    });
    events.subscribe('user:logged',(eventData)=>{
      localStorage.setItem("logged", eventData[0]);
      this.logged=eventData[0];
    });


    // set our app's pages
    this.pages = [
      { title: 'Acceuil', component: HomePage, icon:'home'},
      { title: 'Messages', component: ChatsPage, icon:'chatbubbles'},
      { title: 'Cat&#233;gories', component: CategoriePage , icon:'list-box'},
      { title: 'Mes Favoris', component: ListPage , icon:'heart'},
      { title: 'Invitez vos amis', component: InvitezVosAmisPage, icon:'people' },
      { title: 'Nouveau pr&egrave;s de chez vous', component: NouveautePresDeChezVousPage, icon:'locate' },
      { title: 'Aide', component: ListPage, icon:'help-circle' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      /*let push = Push.init({
        android: {
          senderID: "860269311689"
        },
        ios: {
          senderID: "860269311689",
          alert: "true",
          badge: false,
          sound: "true"
        },
        windows: {}
      });

      push.on('registration', (data) => {
        let tokenData={deviceToken:data.registrationId,idUtilisateur:''};
        alert("device token ->"+data.registrationId);
        //TODO - send device token to server
        if(this.logged)
        {
          tokenData.idUtilisateur=JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED)).id;
        }
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
          //TODO: Your logic on click of push notification directly
          if(push.additionalData['pushInfo'].type=='newMessage')
          {
            self.nav.push(MessagesPage, push.additionalData['data']);
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
      });
      push.on('error', (e) => {
        console.log(e.message);
      });*/

    });
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
       this.nav.push(LoginPage,{message:"Pour lire vos messages, connectez-vous à Occazstreet !"});
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
}
