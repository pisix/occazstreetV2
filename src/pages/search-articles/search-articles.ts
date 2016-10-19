/**
 * Created by root on 11/08/16.
 */

import {Component} from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';
import {NavParams, ViewController, Platform} from "ionic-angular";
import {CategorieService} from "../../services/categorie.service";
import {Categorie} from "../../components/categorie.component";
//import {GoogleplaceDirective} from '../../../node_modules/angular2-google-map-auto-complete/directives/googleplace.directive';

@Component({
  templateUrl: 'search-articles.html',
//  directives: [GoogleplaceDirective]
})
export class searchModalPage{

  public categories:Array<Categorie>;
  public searchForm:any;
  public address : Object;
  private result:Object;

  constructor(private params: NavParams,
              private viewCtrl: ViewController,
              private categorieService:CategorieService,
              private formBuilder: FormBuilder){
    this.categories = [];

    //TODO trouver une validator pour gerer le prix min et max contraindre au prix positif et aux entiers

    this.searchForm = this.formBuilder.group({
      'motcle':[''],
      'ville':[''],
      'categorie':[''],
      'prixmin':[''],
      'prixmax':[''],
      'filterBy': ['prix asc']
    });


    this.categorieService.getAllCategories().subscribe(res => {
      this.categories = res;

    });

  }

  getAddress(place:Object) {
    this.address = place['formatted_address'];
    var location = place['geometry']['location'];
    var lat =  location.lat();
    var lng = location.lng();
  }

  search(event){
    if(this.searchForm.valid){
      console.log(this.searchForm.value);
      this.dismiss(this.searchForm.value);

    }
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}

