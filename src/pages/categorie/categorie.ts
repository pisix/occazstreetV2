import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CategorieService} from '../../services/categorie.service';
import {Categorie} from '../../components/categorie.component'
import {CategorieDetailsPage} from '../../pages/categorie-details/categorie-details'

/*
  Generated class for the Categorie page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-categorie',
  templateUrl: 'categorie.html'
})
export class CategoriePage {

    public categories:Array<Categorie> =[];
    constructor(public navCtrl: NavController, private categorieService:CategorieService) {
      this.categorieService.getAllCategories().subscribe(res=>{
          this.categories=res;
      })

  }

  ionViewDidLoad() {
    console.log('Hello Categorie Page');
  }
  goToDetailsCategorie(event, idCategorie,libelleCategorie)
  {
    let categorie:Categorie;
    categorie.idCategorie=idCategorie;
    categorie.libelle=libelleCategorie;
    this.navCtrl.push(CategorieDetailsPage,{categorie:categorie});
  }

}
