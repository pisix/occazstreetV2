/**
 * Created by dana on 09/08/16.
 */

import {Injectable} from '@angular/core'
import {Http} from "@angular/http";
import {Utilisateur} from "../components/utilisateur.component";
import {GlobalsConstants} from "../constants/globals.constants";
import 'rxjs/add/operator/map';
import {NativeStorage } from 'ionic-native';

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
          if (res.success){
             /* localStorage.setItem(GlobalsConstants.LOCAL_TOKEN_KEY, res.data.token);
              localStorage.setItem(GlobalsConstants.USER_LOGGED, res.data);
              localStorage.setItem("logged", true);*/


              /* NativeStorage.setItem(GlobalsConstants.LOCAL_TOKEN_KEY, res.data.token)
                   .then(
                   () => console.log('Stored item!'),
                       error => console.error('Error storing item', error)
               );
             NativeStorage.setItem(GlobalsConstants.USER_LOGGED, res.data)
                 .then(
                 () => console.log('Stored item!'),
                     error => console.error('Error storing item', error)
             );
             NativeStorage.setItem('logged', true)
                 .then(
                 () => console.log('Stored item!'),
                     error => console.error('Error storing item', error)
             );*/

          }
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



}
