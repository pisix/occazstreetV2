import {Component} from "@angular/core/src/metadata/directives";
import {Categorie} from "../../components/categorie.component";
import {ViewController, Events, AlertController, NavController,LoadingController} from "ionic-angular";
import {CategorieService} from "../../services/categorie.service";
import {Camera} from 'ionic-native';
import {FormBuilder, Validators} from "@angular/forms";
import {GlobalsConstants} from "../../constants/globals.constants";
import {MessagesConstants} from "../../constants/messages.constants";
import {LoginPage} from "../login/login";
import {ArticleService} from "../../services/article.service";
import {MessageService} from "../../services/message.service";
import {ImageService} from "../../services/image.service";
import {Article} from "../../components/article.component";
import {App} from "../../app/app.component";
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

  private cameraOptions = {
  sourceType: Camera.PictureSourceType.CAMERA,
  destinationType: Camera.DestinationType.FILE_URI,
  quality: 100,
  targetWidth: this.imgWidth,
  targetHeight: this.imgHeight,
  encodingType: Camera.EncodingType.PNG,
  correctOrientation: true
  };


  constructor(private viewCtrl: ViewController,
              private navCtrl:NavController,
              private categorieService:CategorieService,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private articleService:ArticleService,
              public loadinCtrl:LoadingController,
              public messageService:MessageService,
              public events:Events,
              private _imageService:ImageService) {

    this.categories = [];
    this.address="";

    //TODO trouver une validator pour gerer le prix min et max contraindre au prix positif et aux entiers

    this.newArticleForm = this.formBuilder.group({
      'titre':['',Validators.required],
      'details':['',Validators.required],
      'categorie':['',Validators.required],
      'ville':['',Validators.required],
      'complementadresse':['',Validators.required],
      'prix':['',Validators.required],
      'echangeable':['false'],
      'negociable':['false'],
    });



    this.categorieService.getAllCategories(App.getUserLanguage()).subscribe(res => {
      this.categories = res;
      console.log(this.categories)

    });
  }

  openImagePickerDialog(index:number){
    this.showImageAlert(index);
    console.log("load Message");
  }


  loadImageFromCamara(imgIndex:number,sourceType:any):void{
    this.cameraOptions.sourceType = sourceType;
    Camera.getPicture(this.cameraOptions)
      .then(file_uri => this.imageSrc[imgIndex] = file_uri,
        err => console.log(err));
  }

  addNewArticle(event)
  {
    let hasImage =false;
    for(var i=0;i<this.imageSrc.length;i++)
    {
      if(this.imageSrc[i]!="")
      {
        hasImage=true;
      }
    }
    if(hasImage)
    {

      let loading=this.loadinCtrl.create();
      loading.present();
      let userId = JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED)).id;
      let ville:string = '';
      let latitude:number = 0;
      let longitude:number = 0;
      let localisation =JSON.parse(localStorage.getItem('localisation'));
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
      if(this.newArticleForm.value.categorie)
      {
        this.articleService.addNewArticle(<Article>this.newArticleForm.value,this.imageSrc).subscribe(res =>{
          alert("article "+JSON.stringify(res));
          if(res["success"]==true)
          {
            let itemsProcessed =0;
            let error;
            this.imageSrc.forEach(i =>{
              itemsProcessed++;
              // this._imageService.upload(i,res.article.idArticle).then(res=>{
              //   if(!(JSON.parse(res.response)).success)
              //   {
              //     error=true;
              //
              //   }
              //     if(itemsProcessed == this.imageSrc.length) {
              //       alert('finish');
              //       if(!error)
              //       {
              //         this.navCtrl.pop();
              //         this.messageService.showToast(MessagesConstants.articleAjouteSucces,"top");
              //         loading.dismiss();
              //       }
              //       else
              //       {
              //         loading.dismiss();
              //         this.messageService.showAlert(MessagesConstants.erreurAjoutArticle,"Création d'une annonce");
              //       }
              //     }
              // }).catch((error)=>{
              //
              // });
            });
          }
          else
          {
            this.messageService.showAlert(MessagesConstants.erreurAjoutArticle,"Création d'une annonce");
          }
        });
      }
      else
      {
        loading.dismiss();
        this.messageService.showToast("Veuillez choisir une catégorie pour votre annonce","top");
      }

    }
    else
    {
      this.messageService.showToast('Veuillez ajouter au moins 1 photo pour votre annonce','top');
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
            this.loadImageFromCamara(imgIndex,Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Appareil photo',
          cssClass:'image-alert-btn',
          handler: () => {
            this.loadImageFromCamara(imgIndex,Camera.PictureSourceType.CAMERA);
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

