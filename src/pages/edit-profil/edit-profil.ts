import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {NavController, ViewController, Events, LoadingController, AlertController} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {GlobalsConstants} from '../../constants/globals.constants';
import {UtilisateurService} from '../../services/utilisateur.service';
import {MessageService} from '../../services/message.service';
import {MessagesConstants} from '../../constants/messages.constants';
import {Camera} from "ionic-native";
import {ImageService} from "../../services/image.service";
declare let google: any;


@Component({
  selector: 'page-edit-profil',
  templateUrl: 'edit-profil.html'
})
export class EditProfilModalPage implements OnInit {

  public updateUserForm: NgForm;
  public nom: string;
  public prenom: string;
  public password: string;
  public email: string;
  public localisation: string;
  public datedenaissance: Date;
  public url = GlobalsConstants.urlServer + GlobalsConstants.port + '/';
  public cheminImage = GlobalsConstants.cheminImage;
  public cheminPhoto = GlobalsConstants.cheminPhoto;
  public photo: string;
  private loggedUser;
  @ViewChild('localisationElement') addressElement: ElementRef;

  private imgWidth = 400;
  private imgHeight = 400;
  private cameraOptions = {
    sourceType: Camera.PictureSourceType.CAMERA,
    destinationType: Camera.DestinationType.FILE_URI,
    quality: 100,
    targetWidth: this.imgWidth,
    targetHeight: this.imgHeight,
    encodingType: Camera.EncodingType.PNG,
    correctOrientation: true
  };

  constructor(public loadingCtrl: LoadingController, private imageService: ImageService, public events: Events, private alertCtrl: AlertController, public navCtrl: NavController, public viewCtrl: ViewController, public utilisateurService: UtilisateurService, public messageService: MessageService) {

  }


  ngOnInit(): void {
    this.loadUtilisateur();
  }

  loadUtilisateur() {
    this.loggedUser = JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED));
    this.nom = this.loggedUser.nom;
    this.email = this.loggedUser.email;
    this.password = this.loggedUser.password;
    this.datedenaissance = this.loggedUser.dateDeNaissance;
    this.prenom = this.loggedUser.prenom;
    this.localisation = this.loggedUser.nomVille + ', ' + this.loggedUser.nomPays;
    if (this.loggedUser.photo.idPhoto != 1) {
      this.photo = this.url + this.cheminPhoto + this.loggedUser.photo.cheminPhoto;
    } else {
      this.photo = null;
    }
  }

  ionViewDidLoad() {
    console.log('Hello EditProfil Page');
  }

  openImagePickerDialog() {
    let imageAlert = this.alertCtrl.create({
      message: '<h5>Choisir une photo depuis ...</h5>',
      buttons: [
        {
          text: 'Gallerie photo',
          cssClass: 'image-alert-btn',
          handler: () => {
            this.loadImageFromCamara(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Appareil photo',
          cssClass: 'image-alert-btn',
          handler: () => {
            this.loadImageFromCamara(Camera.PictureSourceType.CAMERA);
          }
        }
      ]
    });
    imageAlert.present();
  }

  loadImageFromCamara(sourceType: any): void {
    this.cameraOptions.sourceType = sourceType;
    Camera.getPicture(this.cameraOptions)
      .then(file_uri => this.photo = file_uri,
        err => console.log(err));
  }


  ngAfterViewInit() {
    let options = {componentRestrictions: {country: GlobalsConstants.RESTRICTIONCOUNTRYGOOGLEMAP}};
    let input = document.getElementById('localisation').getElementsByTagName('input')[0];

    let autoCompleteCity = new google.maps.places.Autocomplete(input, options);
    google.maps.event.addListener(autoCompleteCity, 'place_changed', function () {

      let place = autoCompleteCity.getPlace();
      let geometry = place.geometry;
      if ((geometry) !== undefined) {
        localStorage.setItem('localisation', JSON.stringify(place));
      }
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit(f) {
    let loading = this.loadingCtrl.create();
    loading.present();
    if (f.value.localisation) {
      let nomVille;
      let nomPays;
      if (localStorage.getItem('localisation')) {
        let localisation = JSON.parse(localStorage.getItem('localisation'));
        for (let ac = 0; ac < localisation.address_components.length; ac++) {
          let component = localisation.address_components[ac];
          switch (component.types[0]) {
            case 'locality':
              nomVille = component.long_name;
              break;
            case 'administrative_area_level_1':
              break;
            case 'country':
              nomPays = component.long_name;
              break;
          }
        }
      } else {
        nomVille = f.value.localisation.split(', ')[0];
        nomPays = f.value.localisation.split(', ')[1];
      }

      let utilisateur;
      if (f.value.password) {
        utilisateur = {
          id: this.loggedUser.id,
          email: f.value.email,
          nom: f.value.nom,
          password: f.value.password,
          prenom: f.value.prenom,
          dateDeNaissance: f.value.datedenaissance,
          nomVille: nomVille,
          nomPays: nomPays
        };

      } else {
        utilisateur = {
          id: this.loggedUser.id,
          email: f.value.email,
          nom: f.value.nom,
          prenom: f.value.prenom,
          dateDeNaissance: f.value.datedenaissance,
          nomVille: nomVille,
          nomPays: nomPays
        };
      }
      this.utilisateurService.editUtilisateur(utilisateur).subscribe(res => {
        if (res.success) {
          let updatedUser = res.utilisateur;

          let imgUrl: Array<string> = this.photo.split('?');

          loading.dismiss();

          this.imageService.uploadUserImg(imgUrl[0], utilisateur.id).then(res => {

            localStorage.removeItem(GlobalsConstants.USER_LOGGED);

            localStorage.setItem(GlobalsConstants.USER_LOGGED, JSON.stringify(updatedUser));

            this.loadUtilisateur();

            this.events.publish('user:update', res.utilisateur);
            this.messageService.showAlert(MessagesConstants.misAJourProfilSuccess, MessagesConstants.miseAjoutProfilTitre);

          }).catch((error) => {
            console.log("error", error)
          });
        }
        else {
          loading.dismiss();
          this.messageService.showAlert(MessagesConstants.misAJourProfilSuccess, MessagesConstants.erreurUpdateProfil);
        }
      })
    } else {
      loading.dismiss();
      this.messageService.showToast("Veuillez renseigner votre localisation !");
    }
  }
}
