/**
 * Created by root on 11/08/16.
 */

import {Component,ElementRef, ViewChild} from '@angular/core'
import { FormBuilder} from '@angular/forms';
import {ViewController,Events} from "ionic-angular";
import {CategorieService} from "../../services/categorie.service";
import {Categorie} from "../../components/categorie.component";
import {GlobalsConstants} from '../../constants/globals.constants';
declare var google: any;
declare var device

@Component({
  templateUrl: 'search-articles.html',
})
export class searchModalPage {

  public categories:Array<Categorie>;
  public searchForm:any;
  public address : Object;
  public ville;
  public locale;


  @ViewChild('villeElement') addressElement: ElementRef;

  constructor(private viewCtrl: ViewController,
              private categorieService:CategorieService,
              private formBuilder: FormBuilder,public events:Events){

    this.categories = [];
    this.address="";

    //TODO trouver une validator pour gerer le prix min et max contraindre au prix positif et aux entiers

    this.searchForm = this.formBuilder.group({
      'motcle':[''],
      'categorie':[''],
      'ville':[''],
      'prixmin':[''],
      'prixmax':[''],
      'filterBy': ['prix asc']
    });

    this.locale=this.getUserLanguage();

    this.categorieService.getAllCategories(this.locale).subscribe(res => {
      this.categories = res;
    });

  }

  /*getAddress(place:Object) {
    this.address = place['formatted_address'];
    var location = place['geometry']['location'];
    var lat =  location.lat();
    var lng = location.lng();
  }*/

  search(event){
    if(this.searchForm.valid){

      let ville;
      let localisation =JSON.parse(localStorage.getItem('localisation'));
      for (let ac = 0; ac < localisation.address_components.length; ac++) {
        let component =localisation.address_components[ac];
        switch(component.types[0]) {
          case 'locality':
            ville = component.long_name;
            break;
        }
      }
      this.searchForm.value.ville = typeof ville === 'string' ? ville : '';
      localStorage.removeItem('localisation');
      let libelleCategorie=(this.searchForm.value.categorie).split('-')[1];
      this.searchForm.value.categorie=(this.searchForm.value.categorie).split('-')[0];
      localStorage.setItem('libelleCategorie',libelleCategorie);
      this.dismiss(this.searchForm.value);
    }
  }

  getUserLanguage():string{
    let  userLang:string = GlobalsConstants.SUPPORTEDLANGUAGES[navigator.language];
    userLang='en';
    return  typeof userLang === "string"?userLang:GlobalsConstants.SUPPORTEDLANGUAGES["default"];
  }

  dismiss(data?) {
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
        localStorage.setItem('localisation',JSON.stringify(place));
      }
    })
  }

  clearVille()
  {
    document.getElementById('ville').getElementsByTagName('input')[0].value=""
  }
}

