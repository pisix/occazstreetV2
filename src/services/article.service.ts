/**
 * Created by dana on 09/08/16.
 */

import {Injectable} from '@angular/core'
import {Http, RequestOptions, Headers} from "@angular/http";
import {Article} from "../components/article.component";
import {GlobalsConstants} from "../constants/globals.constants";
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {ImageService} from "./image.service"

@Injectable()
export class ArticleService{

  constructor(private http: Http,private ImageService:ImageService) {

  }

  getAllArticles() {

    return this.http.get(GlobalsConstants.urlServer + GlobalsConstants.port + '/article/getAllArticles')
      .map((res)=> {
        if (res.status === 200) {

          return (res.json()).articles
        }
        else {
          throw new Error("Could not Articles");
        }
      })
      .map((result: Array<Article>)=> {
        let articles: Array<Article> = [];

        if (result) {

          result.forEach((article)=> {
            articles.push(article);
          })

        }

        return articles;
      });
  }

  getArticlesByLimit(skip, limit) {

    return this.http.get(GlobalsConstants.urlServer + GlobalsConstants.port + '/article/getArticlesByLimit?skip=' + skip + '&limit=' + limit)
      .map((res) => {
        if (res.status === 200) {

          return (res.json()).articles
        }
        else {
          throw new Error("Could not Articles");
        }
      })
      .map((result: Array<Article>)=> {
        let articles: Array<Article> = [];

        if (result) {

          result.forEach((article)=> {
            articles.push(article);
          })

        }

        return articles;
      });
  }

  getArticleByParam(params: any) {

    let data = params;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(GlobalsConstants.urlServer + GlobalsConstants.port + '/article/getArticlesByParam' , data, options)
      .map((res) => {
        if (res.status === 200) {

          return (res.json()).articles
        }
        else {
          throw new Error("Could not Articles");
        }
      })
      .map((result: Array<Article>)=> {
        let articles: Array<Article> = [];

        if (result) {

          result.forEach((article)=> {
            articles.push(article);
          })

        }

        return articles;
      });
  }

  getArticleByUser(user) {
    return this.http.get(GlobalsConstants.urlServer + GlobalsConstants.port + '/article/getArticlesByUser?iduser='+user)
      .map((res) => {
        if (res.status === 200) {

          return (res.json())
        }
        else {
          throw new Error("Could not get User Articles");
        }
      })
      .map((res) => {
        return res;
      });
  }

  getSoldArticleByUser(user) {
    return this.http.get(GlobalsConstants.urlServer + GlobalsConstants.port + '/article/getArticlesVenduByUser?iduser='+user)
      .map((res) => {
        if (res.status === 200) {

          return (res.json())
        }
        else {
          throw new Error("Could note get Sold Articles by User");
        }
      })
      .map((res) => {
        return res;
      });
  }

  getFavoriteArticleByUser(user) {
    return this.http.get(GlobalsConstants.urlServer + GlobalsConstants.port + '/article/getArticlesFavorisByUser?iduser='+user)
      .map((res) => {
        if (res.status === 200) {

          return (res.json())
        }
        else {
          throw new Error("Could note get Favorites Articles by User");
        }
      })
      .map((res) => {
        return res;
      });
  }

  getArticleByCategorie(categorie) {
    return this.http.get(GlobalsConstants.urlServer + GlobalsConstants.port + '/article/getArticleByCategorie?idcategorie='+categorie                                                                                                                                    )
      .map((res) => {
        if (res.status === 200) {

          return (res.json())
        }
        else {
          throw new Error("Could not get Favorites Articles by User");
        }
      })
      .map((res) => {
        return res;
      });
  }

  addToFavorie(userId:number,articleId:number){

    let data = {
      "idutilisateur":userId,
      "idarticle":articleId
    };

    return this.http.post(GlobalsConstants.urlServer + GlobalsConstants.port + '/favoris/ajouterFavoris',data)
      .map((res) => {
        if(res.status === 200){
          return (res.json())
        }else {
          throw  new  Error("Could add to favorite list !")
        }
      })
      .map(res => {
        return res;
      })
  }

  addNewArticle(article:Article,images:Array<string> ){
    return this.http.post(GlobalsConstants.urlServer + GlobalsConstants.port + '/article/createArticleP',article)
      .map(res => {
        if(res.status === 200){
          if((res.json()).success)
          {
            let result=res;
            let article = (res.json()).article;
            var itemsProcessed = 0;
            return res.json();
          }else
          {
            return res.json();
          }

        }else {
          return res.json();
        }
      })
  }

  updateNumberView(article){
    return this.http.post(GlobalsConstants.urlServer + GlobalsConstants.port + '/article/updateNumberView?article='+article.idArticle)
      .map(res => {
        if(res.status === 200){
         return res.json()
        }else {
          return res.json();
        }
      })
  }
}
