/**
 * Created by dana on 09/08/16.
 */

import {Injectable} from '@angular/core'
import {Http} from "@angular/http";
import {GlobalsConstants} from "../constants/globals.constants";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";


@Injectable()
export class UtilisateurService{
  constructor(private http: Http){

  }

  login(credentials){
    return this.http
      .post(
      GlobalsConstants.urlServer+GlobalsConstants.port+'/utilisateur/authenticate',
      credentials)
      .map(res => res.json())
      .map((res) => {
        /*if (res.success){

         }*/
        return res;
      });
  }

  reInitPassword(email)
  {
    return this.http
      .post(
      GlobalsConstants.urlServer+GlobalsConstants.port+'/utilisateur/reInitPassword',
      {email:email})
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  signup(user)
  {
    return this.http
      .post(
      GlobalsConstants.urlServer+GlobalsConstants.port+'/utilisateur/signup',
      user)
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }
}
