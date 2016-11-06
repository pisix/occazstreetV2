import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController, ViewController, ModalController} from 'ionic-angular';
import {Article} from "../../components/article.component";
import {signalerModalPage} from "../signaler-article/signaler-article";
import {GlobalsConstants} from "../../constants/globals.constants";
import {MediaSharing} from "../../services/mediaSharing.service";
import {ArticleService} from "../../services/article.service";
import {MessageService} from "../../services/message.service";


declare var window;

@Component({
  selector:'page-article-details',
  templateUrl: 'article-details.html',
})
export class ArticleDetailsPage implements OnInit{
  public article: Article;
  public imgSliderOption:any;
  public map;
  public url=GlobalsConstants.urlServer+GlobalsConstants.port+'/';
  public cheminImage = GlobalsConstants.cheminImage;
  public cheminPhoto = GlobalsConstants.cheminPhoto;
  public favoris:boolean;

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
              private popoverCtrl: PopoverController) {

    // If we navigated to this page, we will have an item available as a nav param
    this.article = navParams.get('article');
    this.imgSliderOption = {
      initialSlide: 0,
      pager:true
    }

  }


   ngOnInit(): void {
     this.favoris = this.isFavoris(this.article.idArticle);
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

  share(channel:string){
    /*Social Sharing*/
    let message=this.article.titre +" : \n  sur OccazStreet \n pour voir le détails télécharger l'application en allant sur "+GlobalsConstants.APPPLAYSTORE;
    let messageT=this.article.titre  +" : \n sur OccazStreet \n pour voir le détails, télécharger l'application en allant sur " +GlobalsConstants.APPPLAYSTORE;
    let image= "<img src='"+GlobalsConstants.cheminImage +this.article.images[0].cheminImage+"'/>" ;
    let imageLink = this.url+GlobalsConstants.cheminImage +this.article.images[0].cheminImage;
    let link="";


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

        let messageMail="Ce produit pourrait t\'interesser : "+this.article.titre+"\n"+this.article.details;
        let subjectMail=this.article.titre +" sur Occazstreet";

        this.mediaSharing.shareViaEmail(message,subjectMail,null,null,null,imageLink).then(()=>{
          // share succesfull
        }).catch((err)=>{
          console.log(err);
        });

        break;

      case 'whatsapp':

        this.mediaSharing.shareViaWhatApp(message,imageLink).then(()=>{
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
