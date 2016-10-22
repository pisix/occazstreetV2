/**
 * Created by root on 11/08/16.
 */

import {Component,ElementRef, ViewChild} from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms';
import {NavParams, ViewController, Platform,Events} from "ionic-angular";
import {CategorieService} from "../../services/categorie.service";
import {Categorie} from "../../components/categorie.component";
import {GlobalsConstants} from '../../constants/globals.constants';
@Component({
  templateUrl: 'search-articles.html',
//  directives: [GoogleplaceDirective]
})
export class searchModalPage {

  public categories:Array<Categorie>;
  public searchForm:any;
  public address : Object;
  private result:Object;
  public ville;

  @ViewChild('villeElement') addressElement: ElementRef;

  constructor(private params: NavParams,
              private viewCtrl: ViewController,
              private categorieService:CategorieService,
              private formBuilder: FormBuilder,public events:Events){
    this.categories = [];
    this.address="";

    //TODO trouver une validator pour gerer le prix min et max contraindre au prix positif et aux entiers

    this.searchForm = this.formBuilder.group({
      'motcle':[''],
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

      this.ville=localStorage.getItem('villeSearch');
      this.searchForm.value.ville= this.ville;
      console.log(this.searchForm.value);

      this.dismiss(this.searchForm.value);

    }
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  ngAfterViewInit() {
    let options = {componentRestrictions: {country: GlobalsConstants.RESTRICTIONCOUNTRYGOOGLEMAP}};
    let input = document.getElementById('ville').getElementsByTagName('input')[0];

    let autoCompleteCity= new google.maps.places.Autocomplete(input, options);
    google.maps.event.addListener(autoCompleteCity, 'place_changed', function() {

      let place = autoCompleteCity.getPlace();
      let geometry = place.geometry;
      if ((geometry) !== undefined) {
        localStorage.setItem('villeSearch',place.name);
      }
    })
  }

  clearVille()
  {
    document.getElementById('ville').getElementsByTagName('input')[0].value=""
  }
}

