import {Component} from "@angular/core/src/metadata/directives";
import {Categorie} from "../../components/categorie.component";
import {ViewController, Events, AlertController, NavController} from "ionic-angular";
import {CategorieService} from "../../services/categorie.service";
import { ImagePicker,Camera,Dialogs } from 'ionic-native';
import {FormBuilder, Validators} from "@angular/forms";
import {GlobalsConstants} from "../../constants/globals.constants";
import {LoginPage} from "../login/login";
import {ArticleService} from "../../services/article.service";
import {Article} from "../../components/article.component";
declare var  google;

@Component({
  selector:'create-article',
  templateUrl: 'create-article.html'
})

export class CreateArticle{

  public categories:Array<Categorie>;
  public newArticleForm:any;
  public address : Object;
  public ville;
  private imgWidth = 400;
  private imgHeight = 400;
  public imageSrc:Array<string> = ["","","",""];

  constructor(private viewCtrl: ViewController,
              private navCtrl:NavController,
              private categorieService:CategorieService,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private articleService:ArticleService,
              public events:Events) {

    this.categories = [];
    this.address="";

    //TODO trouver une validator pour gerer le prix min et max contraindre au prix positif et aux entiers

    this.newArticleForm = this.formBuilder.group({
      'titre':['',Validators.required],
      'details':[''],
      'categorie':['',Validators.required],
      'ville':[''],
      'complementadresse':[''],
      'prix':[''],
      'echangeable':['false'],
      'negociable':['false'],
    });



    this.categorieService.getAllCategories().subscribe(res => {
      this.categories = res;
      console.log(this.categories)

    });
  }

  loadImage(index:number){
    this.showImageAlert(index);
    console.log("load Message");
  }

  loadImageFromGallery(imgIndex:number):void{
    let options = {
      maximumImagesCount: 1,
      width: this.imgWidth,
      height: this.imgHeight,
      quality: 100
    };

    ImagePicker.getPictures(options)
      .then(file_uri => this.imageSrc[imgIndex] = file_uri,
        err => console.log(err));
  }

  loadImageFromCamara(imgIndex:number):void{
    let cameraOptions = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI,
      quality: 100,
      targetWidth: this.imgWidth,
      targetHeight: this.imgHeight,
      encodingType: Camera.EncodingType.PNG,
      correctOrientation: true
    };

    Camera.getPicture(cameraOptions)
      .then(file_uri => this.imageSrc[imgIndex] = file_uri,
        err => console.log(err));
  }

  addNewArticle(event){
    if(localStorage.getItem("logged")){
      let userId = JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED)).id;
      let ville:string = '';
      let latitude:number = 0;
      let longitude:number = 0;
      let localisation =JSON.parse(localStorage.getItem('localisation'));
      console.log(localisation);
      for (let ac = 0; ac < localisation.address_components.length; ac++) {
        let component = localisation.address_components[ac];
        switch(component.types[0]) {
          case 'locality':
            ville = component.long_name;
            debugger;
            latitude = localisation.geometry.location.lat;
            longitude = localisation.geometry.location.lng;
            break;
        }
      }
      this.newArticleForm.value.ville = ville;
      this.newArticleForm.value.latitude = latitude;
      this.newArticleForm.value.longitude = longitude;
      this.newArticleForm.value.utilisateur = userId;
      console.log(this.newArticleForm.value);

      this.articleService.addNewArticle(<Article>this.newArticleForm.value,this.imageSrc).subscribe(res =>{
        //
      });
    }else {
      this.navCtrl.push(LoginPage);
    }


  }

  showImageAlert(imgIndex:number) {
    let imageAlert = this.alertCtrl.create({
      message:'<h5>Choisir une photo depuis ...</h5>',
      buttons: [
        {
          text: 'Gallerie photo',
          cssClass:'image-alert-btn',
          handler: () => {
            this.loadImageFromGallery(imgIndex);
          }
        },
        {
          text: 'Appareil photo',
          cssClass:'image-alert-btn',
          handler: () => {
            this.loadImageFromCamara(imgIndex);
          }
        }
      ]
    });
    imageAlert.present();
  }

  getAddress(place:Object) {
    this.address = place['formatted_address'];
    var location = place['geometry']['location'];
    var lat =  location.lat();
    var lng = location.lng();
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

