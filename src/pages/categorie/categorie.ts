import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CategorieService} from '../../services/categorie.service';
import {Component} from '../../components/categorie.component';

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

}
