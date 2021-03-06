import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { Observable } from "rxjs";
import {ChatService} from '../../services/chat.service';
import {GlobalsConstants} from '../../constants/globals.constants';
import {MessagesPage} from '../messages/messages';
import {AbstractLoggedPage} from "../abstratLoggedPage";
// moment.locale('fr');


@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage extends AbstractLoggedPage{

  chats: Observable<any[]>;
  public loggedUser;
  public cheminImage = GlobalsConstants.cheminImage;
  public cheminPhoto = GlobalsConstants.cheminPhoto;
  public url=GlobalsConstants.urlServer+GlobalsConstants.port+'/';
  
  constructor(public navCtrl: NavController, public chatService:ChatService, public alertCtrl:AlertController){
    super();
    this.findChats();
  }

  ionViewDidLoad() {
    console.log('Hello Chats Page');
    this.loggedUser=JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED))

  }
  
  
  initData() {
    return undefined;
  }
  
  showMessages(chat): void {
    this.navCtrl.push(MessagesPage, {chat});
  }

  findChats()/*: Observable*/ {
    this.chatService.getConversationByUser(this.loggedUser.id).subscribe(res=>{
      if(res.hasConversation)
      {
        //return Observable.of(res.conversations)
        this.chats=res.conversations;
        console.log(this.chats);
      }
    })
  }

  showMessage(chat:any):void{
    console.log(chat);
    this.navCtrl.push(MessagesPage, {chat});
  }

  removeChat(chat: any): void {
    let alert = this.alertCtrl.create({
      title: '',
      message: 'Voulez-vous supprimer la discussion  ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            console.log(chat);
            this.chatService.deleteConversation(chat.idConversation,this.loggedUser.id).subscribe(res=>{
              if(res.success)
              {
                this.chats=res.conversations;
              }
            })

          }
        }
      ]
    });
    alert.present();

  }
}
