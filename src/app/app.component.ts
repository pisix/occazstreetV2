import {Component, ViewChild} from '@angular/core';
import { Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {LoginPage} from '../pages/login/login';


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

  loginPage = LoginPage;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Acceuil', component: HomePage, icon:'home'},
      { title: 'Catégories', component: ListPage , icon:'list-box'},
      { title: 'Mes Favoris', component: ListPage , icon:'heart'},
      { title: 'Invitez vos amis', component: ListPage, icon:'people' },
      { title: 'Nouveau près de chez vous', component: ListPage, icon:'locate' },
      { title: 'Aide', component: ListPage, icon:'help-circle' }
    ];

    if(this.logged)
    {
      this.pages.push({ title: 'Se déconnecter', component: HomePage , icon:'log-out'});
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
