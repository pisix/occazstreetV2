import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav,ModalController,Events} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {CategoriePage} from '../pages/categorie/categorie';
import {LoginPage} from '../pages/login/login';
import {GlobalsConstants} from "../constants/globals.constants";
import {OccasStreetTimer} from "../pipes/timer.pipe";


@Component({
  templateUrl: 'app.html'
})
export class App {
  @ViewChild(Nav) nav: Nav;
  // make HelloIonicPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any,icon:any}>;
  logged:boolean =false;
  connected=false;
  public infoLoggedUser;


  loginPage=LoginPage;
  public url=GlobalsConstants.urlServer+GlobalsConstants.port+'/';
  public cheminPhoto=GlobalsConstants.cheminPhoto;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private modalController:ModalController,
    public events:Events
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
      { title: 'Cat&#233;gories', component: CategoriePage , icon:'list-box'},
      { title: 'Mes Favoris', component: ListPage , icon:'heart'},
      { title: 'Invitez vos amis', component: ListPage, icon:'people' },
      { title: 'Nouveau pr&egrave;s de chez vous', component: ListPage, icon:'locate' },
      { title: 'Aide', component: ListPage, icon:'help-circle' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

    });
  }


  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    if(page.component)
    {
      this.nav.setRoot(page.component);
    }
    /* else if(page=="loginPage")
     {
     let modal = this.modalController.create(this.loginPage);
     modal.present();
     }*/
    else
    {
      this.nav.setRoot(page);
    }
  }

  doLogout()
  {
    this.menu.close();
    localStorage.removeItem(GlobalsConstants.USER_LOGGED);
    localStorage.removeItem("logged");
    this.logged=false;
  }
}
