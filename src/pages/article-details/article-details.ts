import {Component, OnInit,ElementRef,ViewChild} from '@angular/core';
import {NavParams, PopoverController, ViewController, ModalController, NavController} from 'ionic-angular';
import {Article} from "../../components/article.component";
import {signalerModalPage} from "../signaler-article/signaler-article";
import {GlobalsConstants} from "../../constants/globals.constants";
import {MediaSharing} from "../../services/mediaSharing.service";
import {ArticleService} from "../../services/article.service";
import {MessageService} from "../../services/message.service";
import {MessagesPage} from "../messages/messages";
import {LoginPage} from "../login/login"


declare let window;
declare let google: any;


@Component({
  selector:'page-article-details',
  templateUrl: 'article-details.html',
})
export class ArticleDetailsPage implements OnInit{
  public article: Article;
  public imgSliderOption:any;
  public map:any;
  public url=GlobalsConstants.urlServer+GlobalsConstants.port+'/';
  public cheminImage = GlobalsConstants.cheminImage;
  public cheminPhoto = GlobalsConstants.cheminPhoto;
  public favoris:boolean;
  public showFavorisButton:boolean;

  @ViewChild('map') mapElement: ElementRef;

  private PopoverOptions = {
    cssClass:'',
    showBackdrop:true,
    enableBackdropDismiss:true
  };


  constructor(
              private articleService:ArticleService,
              private messageService:MessageService,
              private navParams: NavParams,
              private mediaSharing:MediaSharing,
              private popoverCtrl: PopoverController,
              private navCtrl:NavController) {

    // If we navigated to this page, we will have an item available as a nav param
    this.article = navParams.get('article');
    this.imgSliderOption = {
      initialSlide: 0,
      pager:true
    };

  }


   ngOnInit(): void {
     if(localStorage.getItem(GlobalsConstants.USER_LOGGED))
     {
       this.favoris = this.isFavoris(this.article.idArticle);
       if(this.article.utilisateur.id!=(JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED))).id)
       {
         this.showFavorisButton=true;
       }
     }


     let latLng = new google.maps.LatLng(this.article.latitude, this.article.longitude);
     let mapOptions = {
       center: latLng,
       zoom:15,
       mapTypeId: google.maps.MapTypeId.ROADMAP,
       scrollwheel: false,
       navigationControl: false,
       mapTypeControl: false,
       scaleControl: false,
       draggable: false,
     };
     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
     let marker = new google.maps.Marker({
       position: new google.maps.LatLng(this.article.latitude, this.article.longitude),
       map: this.map,
       animation: google.maps.Animation.DROP,
       icon:'assets/img/marker.png',
       title: this.article.titre
     });
     google.maps.event.addListener(marker, 'click', ()=>{
     });
  }


  contactOwner(channel:string,event){
    let message;

    switch (channel){
      case "tel":
        window.location.href = "tel:"+this.article.utilisateur.telephone;
        break;
      case "email":
        let subject = "Concernant votre annonce "+"\""+this.article.titre+"\"";

        message = " ";
        this.mediaSharing.shareViaEmail(message,subject,[this.article.utilisateur.email]).then((val) =>{

        }).catch((err) =>{

        });
        break;
      case "sms":

        message = "Concernant votre annonce "+"\""+this.article.titre+"\"";

        this.mediaSharing.shareViaSMS(message,this.article.utilisateur.telephone).then((val)=>{

        }).catch((err)=>{
          console.log(err);
        });
        break;
      default:

    }
  }
  startChat(article,event)
  {
    if(localStorage.getItem(GlobalsConstants.USER_LOGGED))
    {
      this.navCtrl.push(MessagesPage,{startChat:article});
    }
    else
    {
      this.navCtrl.push(LoginPage,{message:"Pour pouvoir envoyer un message à ce vendeur, connectez-vous à Occazstreet ! "})
    }
  }

  share(channel:string){
    /*Social Sharing*/
    let message=this.article.titre +" : \n  sur OccazStreet \n pour voir le détails télécharger l'application en allant sur "+GlobalsConstants.APPPLAYSTORE;
    let imageLink = this.url+GlobalsConstants.cheminImage +this.article.images[0].cheminImage;

    switch (channel){

      case 'facebook':

        this.mediaSharing.shareViaFacebook(message,imageLink,'').then(()=>{
          // share succesfull
        }).catch((err)=>{
          console.log(err);
        });

        break;

      case 'twitter':

        this.mediaSharing.shareTwitter(message+" "+GlobalsConstants.PSEUDOTWITTER,imageLink,'').then(()=>{
          // share succesfull
        }).catch((err)=>{
          console.log(err);
        });

        break;

      case 'mail':

        let subjectMail=this.article.titre +" sur Occazstreet";

        this.mediaSharing.shareViaEmail(message,subjectMail,null,null,null,imageLink).then(()=>{
          // share succesfull
        }).catch((err)=>{
          console.log(err);
        });

        break;

      case 'whatsapp':

        this.mediaSharing.shareViaWhatsApp(message,imageLink).then(()=>{
          // share succesfull
        }).catch((err)=>{
          console.log(err);
        });

        break;
      case 'sms':

        this.mediaSharing.shareViaSMS(message).then(()=>{
          // share succesfull
        }).catch((err)=>{
          console.log(err);
        });
        break;
      default:{
        console.log('Impossible de partager cette annonce');
      }
    }
  }

  addToFavoriteList(articleId:number){
    if(localStorage.getItem(GlobalsConstants.USER_LOGGED))
    {
      let userId:number = JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED)).id;

      this.articleService.addToFavorie(userId,articleId).subscribe(res => {

        if(res.success && res.suppression) {

          this.favoris=false;

        }else if(res.success && !res.suppression) {

          this.favoris=true;

        }
        this.messageService.showToast(res.message);
      })

    }
    else
    {
      this.navCtrl.push(LoginPage,{message:"Pour pouvoir ajouter cet article en favoris, connectez-vous à Occazstreet ! "})

    }

  }

  isFavoris(articleId:number):boolean{
    let favoris =  JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED)).favoris;

    if(typeof favoris === 'undefined'){
      return false
    }

    let tmp = favoris.filter(fav => {
      fav.article == articleId;
    }).map(k => k.article);

    return (tmp.length === 1 && tmp[0] === this.article.idArticle)?true:false;
  }

  option(myEvent){
    let popover = this.popoverCtrl.create(articleDetailtPopOver,{},this.PopoverOptions);
    popover.present({
      ev: myEvent
    });
  }
}

@Component({
  template: '<p text-center (click)="close()">Signaler</p>'
})

class articleDetailtPopOver {
  constructor(private viewCtrl: ViewController,private modalController : ModalController) {}

  close() {
    let modal = this.modalController.create(signalerModalPage);
    modal.present();

    console.log("Je signale");
    this.viewCtrl.dismiss();
  }
}
