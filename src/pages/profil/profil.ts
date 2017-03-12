import { Component } from '@angular/core';
import { NavController,NavParams,ToastController, LoadingController,ModalController,Events,ActionSheetController, AlertController} from 'ionic-angular';
import {Utilisateur} from '../../components/utilisateur.component';
import {GlobalsConstants} from '../../constants/globals.constants';
import {MessagesConstants} from '../../constants/messages.constants';
import {Article} from '../../components/article.component';
import {ArticleDetailsPage} from '../article-details/article-details';
import {HomePage} from '../home/home';
import {ActiviteModalPage} from '../activite/activite';
import {EditProfilModalPage} from '../edit-profil/edit-profil';
import {MessageService} from '../../services/message.service';
import {ArticleService} from '../../services/article.service';
import {MediaSharing} from '../../services/mediaSharing.service'
import {EditArticlePage} from '../../pages/edit-article/edit-article';

/*
  Generated class for the Profil page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})
export class ProfilPage {
  public utilisateur: Utilisateur;
  public url=GlobalsConstants.urlServer+GlobalsConstants.port+'/';
  public cheminImage = GlobalsConstants.cheminImage;
  public cheminPhoto = GlobalsConstants.cheminPhoto;
  public profileTab;
  public articleUser;
  public articleSoldUser;
  public articleFavoriteUser;
  public showEdit:boolean=false;
  private loggedUser:Utilisateur;
  private loading;


  constructor(public alertCtrl:AlertController,public actionSheetCtrl: ActionSheetController,public mediaSharing:MediaSharing, public events:Events,public modalCtrl:ModalController,public messageService:MessageService,public navCtrl: NavController,public navParams:NavParams,private articleService:ArticleService,public toastCtrl:ToastController,public loadingCtrl:LoadingController) {
   // this.utilisateur = navParams.get('loggedUser');

    this.loggedUser=JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED));
    this.utilisateur = JSON.parse(navParams.get('user'));
    this.profileTab="envente";
    if(this.loggedUser.id=this.utilisateur.id)
    {
      this.showEdit=true;
    }

    events.subscribe('user:logged-data',(userEventData)=> {
      this.utilisateur=userEventData[0];
    });

    events.subscribe('user:update',(userEventData)=> {
      localStorage.setItem(GlobalsConstants.USER_LOGGED,JSON.stringify(userEventData));
      this.utilisateur=userEventData;
    });



  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.articleService.getArticleByUser(this.utilisateur.id).subscribe(res=>{
      if(res.success)
      {
        this.articleUser=res.articles;
        console.log("Article user"+this.articleUser);
        this.articleService.getSoldArticleByUser(this.utilisateur.id).subscribe(res2=>{
          if(res2.success)
          {
            this.articleSoldUser=res2.articles;
            console.log("En vente "+this.articleSoldUser);
            this.articleService.getFavoriteArticleByUser(this.utilisateur.id).subscribe(res3=>{
              if(res3.success)
              {
                this.articleFavoriteUser=res3.articles;
                console.log("Favoris "+this.articleFavoriteUser);

                loading.dismiss();
              }else{
                loading.dismiss();
                this.messageService.showToast(MessagesConstants.erreurRecuperationArticleUtilisateur);
              }
            })
          }else
          {
            loading.dismiss();
            this.messageService.showToast(MessagesConstants.erreurRecuperationArticleUtilisateur);
          }
        })
      }
      else
      {
        loading.dismiss();
        this.messageService.showToast(MessagesConstants.erreurRecuperationArticleUtilisateur);
      }

    })
  }
  ionViewWillEnter() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.articleService.getArticleByUser(this.utilisateur.id).subscribe(res=>{
      if(res.success)
      {
        this.articleUser=res.articles;
        console.log("Article user"+this.articleUser);
        this.articleService.getSoldArticleByUser(this.utilisateur.id).subscribe(res2=>{
          if(res2.success)
          {
            this.articleSoldUser=res2.articles;
            console.log("En vente "+this.articleSoldUser);
            this.articleService.getFavoriteArticleByUser(this.utilisateur.id).subscribe(res3=>{
              if(res3.success)
              {
                this.articleFavoriteUser=res3.articles;
                console.log("Favoris "+this.articleFavoriteUser);

                loading.dismiss();
              }else{
                loading.dismiss();
                this.messageService.showToast(MessagesConstants.erreurRecuperationArticleUtilisateur);
              }
            })
          }else
          {
            loading.dismiss();
            this.messageService.showToast(MessagesConstants.erreurRecuperationArticleUtilisateur);
          }
        })
      }
      else
      {
        loading.dismiss();
        this.messageService.showToast(MessagesConstants.erreurRecuperationArticleUtilisateur);
      }

    })

  }

  selectedEnVente(){
    this.profileTab="envente";
  }
  selectedVendu(){
    this.profileTab="vendu";
  }
  selectedFavoris(){
    this.profileTab="favoris";
  }

  goToAddArticlePage()
  {

  }

  goToEditProfilePage()
  {

  }

  goToHomePage()
  {
    this.navCtrl.setRoot(HomePage)
  }

  showLoading()
  {
    this.loading = this.loadingCtrl.create({
      content: 'Patientez...'
    });

    this.loading.present();
  }

  hideLoading()
  {
      this.loading.dismiss();
  }

  goToDetailArticlePage(event,item:Article){
    this.navCtrl.push(ArticleDetailsPage, {
      article: item
    });
  }

  goToActivite(utilisateur) {
    let modal = this.modalCtrl.create(ActiviteModalPage,{idutilisateur:utilisateur});
    modal.present();

    /*modal.onDidDismiss(data => {
      console.log('MODAL DATA', data);
      this.navCtrl.push(SearchResult, {
        searchParam: data
      });

    });*/
  }

  goToEditProfil(utilisateur) {
    let modal = this.modalCtrl.create(EditProfilModalPage,{idutilisateur:utilisateur});
    modal.present();

   /* modal.onDidDismiss(data => {
     console.log('MODAL DATA', data);
     this.navCtrl.push(SearchResult, {
     searchParam: data
     });

     });*/
  }
  share(channel:string){
    /*Social Sharing*/
    let message="Découvrez mon profil et mes articles en vente sur @OccazStreet \n en téléchargent  l'application  sur "+GlobalsConstants.APPPLAYSTORE;
   // let imageLink = this.url+GlobalsConstants.cheminImage +this.article.images[0].cheminImage;
    let imageLink=null;


    switch (channel){

      case 'facebook':

        this.mediaSharing.shareViaFacebook(message,null,'').then(()=>{
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

      case 'whatsapp':
        this.mediaSharing.shareViaWhatsApp(message,null,imageLink).then(()=>{
          // share succesfull
        }).catch((err)=>{
          console.log(err);
        });

        break;

      case 'instagram':

        this.mediaSharing.shareViaInstagram(message,imageLink).then(()=>{
          // share succesfull
        }).catch((err)=>{
          console.log(err);
        });

        break;
      default:{
        console.log('Impossible de partager ce profil');
      }
    }
  }
  showAction(e,article)
  {

    if(article.utilisateur.id==JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED)).id)
    {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Gestion d\'article',
        buttons: [
          {
            text: 'Modifier l\'annonce',
            handler: () => {
              this.navCtrl.push(EditArticlePage,{article:article});
            }
          },
          {
            text: 'Supprimer l\'annonce',
            handler: () => {
              let alert=this.alertCtrl.create({
                title:'Confirmation suppression',
                subTitle:"Cette opération est irreversible. Confirmez-vous la suppression de votre annonce ?",
                buttons: [
                  {
                    text: 'Oui',
                    handler: () => {

                      let loading=this.loadingCtrl.create();
                      loading.present();
                      this.articleService.deleteArticle(article).subscribe(res=>{
                        if(res.success)
                        {
                          loading.dismiss()
                          this.messageService.showAlert('Votre annonce a été supprimée avec succès','Suppression');
                          this.ionViewDidLoad();
                        }

                      },(err) => {
                        loading.dismiss();
                        this.messageService.showToast('Une erreur interne est survenue. Veuillez reprendre l\'opération');
                      });
                    }
                  },
                  {
                    text: 'Non',
                    handler: () => {
                    }
                  }
                ]
              });
              alert.present();

            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }

  }


}
