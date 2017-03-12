import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import {Article} from '../../components/article.component';
import {Categorie} from '../../components/categorie.component';
import {FormBuilder, Validators} from "@angular/forms";
import {GlobalsConstants} from "../../constants/globals.constants";
import {MessagesConstants} from "../../constants/messages.constants";
import {ArticleService} from "../../services/article.service";
import {MessageService} from "../../services/message.service";
import {ImageService} from "../../services/image.service";
import {CategorieService} from "../../services/categorie.service";
import {Camera} from 'ionic-native';



/*
  Generated class for the EditArticle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-article',
  templateUrl: 'edit-article.html'
})
export class EditArticlePage {

  public updateArticleForm:any;
  public article;
  public categories:Array<Categorie>;
  public locale;
  public ville;
  public url=GlobalsConstants.urlServer+GlobalsConstants.port+'/';
  public cheminImage=GlobalsConstants.cheminImage;
  private imgWidth = 400;
  private imgHeight = 400;
  public address : Object;
  public imageSrc:Array<any> = ["","","",""];


  private cameraOptions = {
    sourceType: Camera.PictureSourceType.CAMERA,
    destinationType: Camera.DestinationType.FILE_URI,
    quality: 100,
    targetWidth: this.imgWidth,
    targetHeight: this.imgHeight,
    encodingType: Camera.EncodingType.PNG,
    correctOrientation: true
  };




  constructor(public loadingCtrl:LoadingController,public messageService:MessageService,public imageService:ImageService,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,private articleService:ArticleService, private categorieService:CategorieService) {
    this.article=<Article>navParams.get('article');
    for(let i=0;i<this.article.images.length;i++)
    {
      this.imageSrc[i]={file_uri:this.article.images[i].cheminImage,path:true,idImage:this.article.images[i].idImage};
    }

    console.log(this.article);
    console.log(this.imageSrc);
    this.updateArticleForm = this.formBuilder.group({
      'titre':[this.article.titre,Validators.required],
      'details':[this.article.details,Validators.required],
      'categorie':[this.article.categorie.idcategorie,Validators.required],
      'complementadresse':[this.article.complementadresse,Validators.required],
      'prix':[this.article.prix,Validators.required],
      'echangeable':[this.article.echangeable],
      'negociable':[this.article.negociable],
      'vendu':[this.article.vendu]
    });

    this.ville=this.article.nomVille;
    this.locale=this.getUserLanguage();
    this.categorieService.getAllCategories(this.locale).subscribe(res => {
      this.categories = res;

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditArticlePage');
  }

  getUserLanguage():string{
    let  userLang:string = GlobalsConstants.SUPPORTEDLANGUAGES[navigator.language];
    userLang='en';
    return  typeof userLang === "string"?userLang:GlobalsConstants.SUPPORTEDLANGUAGES["default"];
  }

  clearVille()
  {
    document.getElementById('ville').getElementsByTagName('input')[0].value=""
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

  updateArticle()
  {
    let loading=this.loadingCtrl.create();
    loading.present();
    let userId = JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED)).id;
    let latitude:number = 0;
    let longitude:number = 0;
    let city:string;

    let localisation =JSON.parse(localStorage.getItem('localisation'));
    for (let ac = 0; ac < localisation.address_components.length; ac++) {
      let component = localisation.address_components[ac];
      switch(component.types[0]) {
        case 'locality':
          city = component.long_name;
          debugger;
          latitude = localisation.geometry.location.lat;
          longitude = localisation.geometry.location.lng;
          break;
      }
    }
    this.updateArticleForm.value.ville = city;
    this.updateArticleForm.value.latitude = latitude;
    this.updateArticleForm.value.longitude = longitude;
    this.updateArticleForm.value.utilisateur = userId;
    this.updateArticleForm.value.idArticle=this.article.idArticle;
    this.articleService.updateArticle(<Article>this.updateArticleForm.value,this.imageSrc).subscribe(res =>{
      if(res.success==true)
      {
        this.article=res.article;
        let itemsProcessed =0;
        let error;
        console.log(this.imageSrc);
        this.imageSrc.forEach(i =>{
          itemsProcessed++;
          console.log(i);
            if(i!='' && i.file_uri.indexOf('file')!==-1)
            {
              this.imageService.updateImage(i.file_uri,res.article.idArticle,i.idImage,i.oldFileName).then(res=>{
                if(!(JSON.parse(res.response)).success)
                {
                  error=true;
                }
                if(itemsProcessed == this.imageSrc.length) {
                  if(!error)
                  {
                    this.article=(JSON.parse(res.response)).article;
                    this.messageService.showToast(MessagesConstants.articleUpdateSucces,"top");
                    loading.dismiss();
                  }
                  else
                  {
                    loading.dismiss();
                    this.messageService.showAlert(MessagesConstants.erreurUpdateArticle,"Modification d'une annonce");
                  }
                }
              },(err) => {
                loading.dismiss();
                this.messageService.showToast("Une erreur interne est survenue","bottom");
              })

            }else
            {
              if(itemsProcessed == this.imageSrc.length) {
                if(!error)
                {
                  this.article=(JSON.parse(res.response)).article;
                  this.messageService.showToast(MessagesConstants.articleUpdateSucces,"top");
                  loading.dismiss();
                }
                else
                {
                  loading.dismiss();
                  this.messageService.showAlert(MessagesConstants.erreurUpdateArticle,"Modification d'une annonce");
                }
              }
            }

        });
      }
      else
      {
        loading.dismiss();
        this.messageService.showAlert(MessagesConstants.erreurUpdateArticle,"Modification d'une annonce");
      }
    },(err) => {
      loading.dismiss();
      this.messageService.showToast("Une erreur interne est survenue","bottom");
    })
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

  loadImageFromCamara(imgIndex:number,sourceType:any):void{

  let cameraOptions = {
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.FILE_URI,
      quality: 100,
      targetWidth: this.imgWidth,
      targetHeight: this.imgHeight,
      encodingType: Camera.EncodingType.PNG,
      correctOrientation: true
    };

    this.cameraOptions.sourceType = sourceType;
    Camera.getPicture(this.cameraOptions)
      .then(file_uri => {
        let file=file_uri.split("?")[0];
        if(file)
        {
          if( this.imageSrc[imgIndex].idImage !=null)
          {
            let oldFileName= this.imageSrc[imgIndex].file_uri;
            this.imageSrc[imgIndex] = {file_uri:file,path:false,idImage:this.imageSrc[imgIndex].idImage,oldFileName: oldFileName};
          }else
          {
            this.imageSrc[imgIndex] = {file_uri:file,path:false,idImage:null,oldFileName:null};
          }
        }
      },
        err => console.log(err));
  }

  openImagePickerDialog(index:number){
    this.showImageAlert(index);
    console.log("load Message");
  }


}
