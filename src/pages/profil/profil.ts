import { Component } from '@angular/core';
import { NavController,NavParams,ToastController, LoadingController,ModalController } from 'ionic-angular';
import {Utilisateur} from '../../components/utilisateur.component';
import {GlobalsConstants} from '../../constants/globals.constants';
import {MessagesConstants} from '../../constants/messages.constants';
import {ArticleService} from '../../services/article.service';
import {Article} from '../../components/article.component';
import {ArticleDetailsPage} from '../article-details/article-details';
import {HomePage} from '../home/home';
import {ActiviteModalPage} from '../activite/activite';
import {EditProfilModalPage} from '../edit-profil/edit-profil';

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


  constructor(public modalCtrl:ModalController,public navCtrl: NavController,public navParams:NavParams,private articleService:ArticleService,public toastCtrl:ToastController,public loadingCtrl:LoadingController) {
   // this.utilisateur = navParams.get('loggedUser');

    this.loggedUser=JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED));
    this.utilisateur = JSON.parse(navParams.get('user'));
    this.profileTab="envente";
    if(this.loggedUser.id=this.utilisateur.id)
    {
      this.showEdit=true;
    }


    articleService.getArticleByUser(this.utilisateur.id).subscribe(res=>{
      if(res.success)
      {
        this.articleUser=res.articles;
        articleService.getSoldArticleByUser(this.utilisateur.id).subscribe(res2=>{
          if(res2.success)
          {
            this.articleSoldUser=res2.articles;
            articleService.getFavoriteArticleByUser(this.utilisateur.id).subscribe(res3=>{
              if(res3.success)
              {
                this.articleFavoriteUser=res3.articles;
              }else{
                this.showToast(MessagesConstants.erreurRecuperationArticleUtilisateur);

              }
            })
          }else
          {
            this.showToast(MessagesConstants.erreurRecuperationArticleUtilisateur);
          }
        })
      }
      else{
        this.showToast(MessagesConstants.erreurRecuperationArticleUtilisateur);
      }
    })


  }

  ionViewDidLoad() {
    console.log('Hello Profil Page');
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

  showToast(message)
  {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'bottom',
      showCloseButton: true,
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
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

}
