import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {LoginModalPage} from '../pages/login/login';
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
  loggedPages: Array<{title: string, component: any,icon:any}>;
  logged:boolean =false;

  loginPage=LoginModalPage;
  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Acceuil', component: HomePage, icon:'home'},
      { title: 'Cat�gories', component: ListPage , icon:'list-box'},
      { title: 'Mes Favoris', component: ListPage , icon:'heart'},
      { title: 'Invitez vos amis', component: ListPage, icon:'people' },
      { title: 'Nouveau pr�s de chez vous', component: ListPage, icon:'locate' },
      { title: 'Aide', component: ListPage, icon:'help-circle' }
    ];

    if(!this.logged)
    {
      this.pages.push({ title: 'Se d�connecter', component: ListPage , icon:'log-out',logged:true});
    }

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
    else
    {
      this.nav.setRoot(page);
    }
  }
}