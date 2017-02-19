import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CategorieService} from '../../services/categorie.service';
import {Categorie} from '../../components/categorie.component';
import {CategorieDetailsPage} from '../../pages/categorie-details/categorie-details';
import {GlobalsConstants} from '../../constants/globals.constants';


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
    public locale;
    constructor(public navCtrl: NavController, private categorieService:CategorieService) {
      this.locale=this.getUserLanguage();
      console.log(this.locale);
      this.categorieService.getAllCategories(this.locale).subscribe(res=>{
          this.categories=res;
      })

  }

  ionViewDidLoad() {
    console.log('Hello Categorie Page');
  }
  goToDetailsCategorie(event,laCategorie)
  {
    let categorie =new Categorie();
    categorie.idCategorie=laCategorie.idcategorie;
    categorie.libelle=this.locale=='fr'?laCategorie.libelle:laCategorie.libelleEn;
    console.log(categorie);
    this.navCtrl.push(CategorieDetailsPage,{categorie:categorie});
  }

  getUserLanguage():string{
    let  userLang:string = GlobalsConstants.SUPPORTEDLANGUAGES[navigator.language];
    userLang='en';
    return  typeof userLang === "string"?userLang:GlobalsConstants.SUPPORTEDLANGUAGES["default"];
  }
}
