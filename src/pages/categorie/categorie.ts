import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CategorieService} from '../../services/categorie.service';
import {Categorie} from '../../components/categorie.component';
import {CategorieDetailsPage} from '../../pages/categorie-details/categorie-details';
import {GlobalsConstants} from '../../constants/globals.constants';
import {App} from "../../app/app.component";

@Component({
  selector: 'page-categorie',
  templateUrl: 'categorie.html'
})
export class CategoriePage {

  public categories: Array<Categorie> = [];
  public locale;

  constructor(public navCtrl: NavController, private categorieService: CategorieService) {
    this.locale = this.getUserLanguage();
    this.categorieService.getAllCategories(this.locale).subscribe(res => {
      this.categories = res;
    })

  }
  public getUserLanguage():string{
    let  userLang:string = GlobalsConstants.SUPPORTEDLANGUAGES[navigator.language];
    return  typeof userLang === "string"?userLang:GlobalsConstants.SUPPORTEDLANGUAGES["default"];
  }


  ionViewDidLoad() {
    console.log('Hello Categorie Page');
  }

  goToDetailsCategorie(event, laCategorie) {
    let categorie = new Categorie();
    categorie.idCategorie = laCategorie.idcategorie;
    categorie.libelle = this.locale == 'fr' ? laCategorie.libelle : laCategorie.libelleEn;
    console.log(categorie);
    this.navCtrl.push(CategorieDetailsPage, {categorie: categorie});
  }
}
