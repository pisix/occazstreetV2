import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController  } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import {ArticleDetailsPage} from '../article-details/article-details';
import {Article} from '../../components/article.component';
import {ArticleService} from '../../services/article.service';
/*
  Generated class for the NouveautePresDeChezVous page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var google: any;

@Component({
  selector: 'page-nouveaute-pres-de-chez-vous',
  templateUrl: 'nouveaute-pres-de-chez-vous.html'
})
export class NouveautePresDeChezVousPage {

  public articles: Array<any>;
  public searchKey: string = "";

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markersGroup;

  constructor(public navCtrl: NavController,  public articleService:ArticleService) {
    this.findAll();
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  findAll()
  {
    this.articleService.getAllArticles().subscribe(res=>{
      console.log(JSON.stringify(res));
      this.articles=res;
     })
  }

  loadMap(){

    Geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log(position.coords.latitude+", "+position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.showMarkers()

    }, (err) => {
      console.log(err);
    });

  }
  openArticleDetails(article:Article)
  {
    this.navCtrl.push(ArticleDetailsPage, {
      article: article
    });
  }

  showMarkers()
  {
    let infoWindow = new google.maps.InfoWindow();
    this.articles.forEach(article => {
     this.createMarker(article);
    });
  }

  createMarker (article){
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(article.latitude, article.longitude),
      map: this.map,
      animation: google.maps.Animation.DROP,
      icon:'../assets/img/marker.png',
      title: article.titre
    });

    marker.content = '<div >' + article.titre + '</div>';
    let infoWindow = new google.maps.InfoWindow({
      content: marker.content
    });
    google.maps.event.addListener(marker, 'click', ()=>{
      //infoWindow.open(this.map, marker);
      this.openArticleDetails(article);
    });
  }

  /*loadMap(){


    if(!this.platform.is('cordova'))
    {
      navigator.geolocation.getCurrentPosition(function(position)
      {
        console.log(position.coords.latitude+", "+position.coords.longitude);
        setTimeout(() => {
          console.log(JSON.stringify(L.map(this.mapElement)));
          this.map = L.map(this.mapElement.nativeElement).setView([position.coords.latitude,position.coords.longitude], 14);
          L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri'
          }).addTo(this.map);
          // this.showMarkers();
        })
      });
    }else
    {
      Geolocation.getCurrentPosition().then((position) => {
        setTimeout(() => {
          this.map = L.map("map").setView([position.coords.latitude,position.coords.longitude], 14);
          L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri'
          }).addTo(this.map);
          // this.showMarkers();
        })
      }, (err) => {
        console.log(err);
      });

    }

  }*/

}
