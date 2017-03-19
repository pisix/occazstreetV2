import {Injectable} from '@angular/core'
import {Http} from "@angular/http";
import {GlobalsConstants} from "../constants/globals.constants";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";



@Injectable()
export class ChatService{
  constructor(private http: Http){

  }

  getConversationByUser(iduser)
  {
    return this.http
      .get(
      GlobalsConstants.urlServer + GlobalsConstants.port + '/conversation/getConversationByUser?iduser='+iduser)
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getConversationById(chat)
  {
    return this.http
      .get(
      GlobalsConstants.urlServer + GlobalsConstants.port + '/conversation/getConversationById?idconversation='+chat.idConversation)
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  createConversation(conversation)
  {
    return this.http
      .post(
      GlobalsConstants.urlServer+GlobalsConstants.port+'/conversation/addConversation',
      conversation)
      .map(res => res.json())
      .map((res) => {
        /*if (res.success){

         }*/
        return res;
      });
  }
  getMessagesByConversation(chat) {
    return this.http
      .get(
      GlobalsConstants.urlServer + GlobalsConstants.port + '/message/getMessagesByConversation?idconversation=' + chat.idConversation)
      .map(res => res.json())
      .map((res) => {
        let loggedUser=JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED));
        res.messages.forEach((message: any) => {
          if(message.userId==loggedUser.id)
          {
            message.ownership='mine';
          }else
          {
            message.ownership='other'
          }
        });
        return res;
      });
  }

  deleteConversation(conversation,iduser){
      return this.http
    .get(
      GlobalsConstants.urlServer + GlobalsConstants.port + '/conversation/deleteConversation?idconversation='+conversation+'&iduser='+iduser)
    .map(res => res.json())
    .map((res) => {
      return res;
    });
  }

  sendMessage(message)
  {
    return this.http
      .post(
      GlobalsConstants.urlServer+GlobalsConstants.port+'/message/addMessage',
      message)
      .map(res => res.json())
      .map((res) => {
        /*if (res.success){

         }*/
        return res;
      });
  }

}
