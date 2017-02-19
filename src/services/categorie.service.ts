/**
 * Created by dana on 09/08/16.
 */

import {Injectable} from '@angular/core'
import {Http} from "@angular/http";
import {GlobalsConstants} from "../constants/globals.constants";
import {Categorie} from '../components/categorie.component';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";


@Injectable()
export class CategorieService{
  constructor(private http: Http){

  }

  getUserLanguage():string{
    let  userLang:string = GlobalsConstants.SUPPORTEDLANGUAGES[navigator.language];
    return  typeof userLang === "string"?userLang:GlobalsConstants.SUPPORTEDLANGUAGES["default"];
  }
 getAllCategories(locale)
 {
    console.log(locale);
     return this.http.get(GlobalsConstants.urlServer+GlobalsConstants.port+'/categorie/getAllCategorie?locale='+locale)
         .map((res)=>{
             if(res.status === 200){

                 return (res.json()).categories
             }
             else{
                 throw new Error("Could not get categories");
             }
         })
         .map((result:Array<Categorie>)=>{
             let categories:Array<Categorie> =[];

             if(result){

                 result.forEach((categorie)=>{
                     categories.push(categorie);
                 })

             }
         console.log(categories);

             return categories;
         });
 }



}
