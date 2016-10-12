/**
 * Created by dana on 09/08/16.
 */

import {Injectable} from '@angular/core'
import {Http} from "@angular/http";
import {Article} from "../components/article.component";
import {GlobalsConstants} from "../constants/globals.constants";
import 'rxjs/add/operator/map'

@Injectable()
export class ArticleService{

  constructor(private http: Http){

  }

  getAllArticles(){

    return this.http.get(GlobalsConstants.urlServer+GlobalsConstants.port+'/article/getAllArticles')
      .map((res)=>{
        if(res.status === 200){

          return (res.json()).articles
        }
        else{
          throw new Error("Could not Articles");
        }
      })
      .map((result:Array<Article>)=>{
        let articles:Array<Article> =[];

        if(result){

          result.forEach((article)=>{
            articles.push(article);
          })

        }

        return articles;
      });
  }

  getArticlesByLimit(skip,limit){

      return this.http.get(GlobalsConstants.urlServer+GlobalsConstants.port+'/article/getArticlesByLimit?skip='+skip+'&limit='+limit)
        .map((res) => {
          if(res.status === 200){

            return (res.json()).articles
          }
          else{
            throw new Error("Could not Articles");
          }
        })
        .map((result:Array<Article>)=>{
          let articles:Array<Article> =[];

          if(result){

            result.forEach((article)=>{
              articles.push(article);
            })

          }

          return articles;
        });
  }

}
