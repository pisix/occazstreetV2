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
  editUtilisateur(utilisateur)
  {
    console.log("service "+utilisateur);
    return this.http
      .post(
      GlobalsConstants.urlServer+GlobalsConstants.port+'/utilisateur/updateUtilisateurP',
      utilisateur)
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
  doOauth(token,userData) {
    userData.token = token;
    return this.http
      .post(
      GlobalsConstants.urlServer + GlobalsConstants.port + '/utilisateur/oauth',
      userData)
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getUserActivity(idUser)
  {
    return this.http
      .get(
      GlobalsConstants.urlServer + GlobalsConstants.port + '/utilisateur/getActiviteUser?idutilisateur='+idUser)
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }
}
