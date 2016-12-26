import { Component,OnDestroy, ElementRef,OnInit,NgZone,AfterViewChecked } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {ChatService} from '../../services/chat.service';
import {GlobalsConstants} from '../../constants/globals.constants';
import {MessagesConstants} from '../../constants/messages.constants';
import { Observable, Subscription } from "rxjs";
import {ArticleDetailsPage} from '../article-details/article-details';
import {Utilisateur} from '../../components/utilisateur.component';
import {Article} from '../../components/article.component';
import {MessageService} from '../../services/message.service'
// import moment from 'moment';
// import 'moment/locale/fr';
//
// moment.locale('fr');
// console.log(moment.locale());
/*
  Generated class for the Messages page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage implements  OnInit, OnDestroy,AfterViewChecked{

  selectedChat: any;
  messages: Observable<any>[];
  message: string = "";
  autoScroller: Subscription;
  public title: string;
  public prix:string;
  public picture: string;
  public article:Article;
  public loggedUser;
  public cheminImage = GlobalsConstants.cheminImage;
  public cheminPhoto = GlobalsConstants.cheminPhoto;
  public url=GlobalsConstants.urlServer+GlobalsConstants.port+'/';
  private receiver:Utilisateur;
  private idConversation;

  constructor(zone: NgZone,public navCtrl: NavController,navParams: NavParams,public chatService:ChatService,element: ElementRef,public messageService:MessageService,public el: ElementRef) {
    if(localStorage.getItem(GlobalsConstants.USER_LOGGED))
    {
      this.selectedChat = navParams.get('chat');
      this.article=navParams.get('startChat');
      if(this.selectedChat)
      {
        console.log(this.selectedChat);
        this.title = this.selectedChat.article.titre;
        this.prix=this.selectedChat.article.prix;
        this.picture = this.url+this.cheminPhoto+this.selectedChat.utilisateur2.photo.cheminPhoto;
        this.article=<Article>this.selectedChat.article;
        this.loggedUser=JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED));
        this.idConversation=this.selectedChat.idConversation;
      }

      if(navParams.get('startChat'))
      {
        this.title = navParams.get('startChat').titre;
        this.prix=navParams.get('startChat').prix;
        this.article=<Article>navParams.get('startChat');
        this.loggedUser=JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED));

        //Creation de la conversation
        let conversation={utilisateur1:'',utilisateur2:'',article:null};
        conversation.utilisateur1=JSON.parse(localStorage.getItem(GlobalsConstants.USER_LOGGED)).id;
        conversation.utilisateur2=navParams.get('startChat').utilisateur.id;
        conversation.article=this.article.idArticle;
        this.chatService.createConversation(conversation).subscribe(res=>{
          this.idConversation=res.idConversation;
        });
      }
    }else
    {

    }

  //this.scrollToBottom();
  }

  ionViewDidLoad() {
    console.log('Hello Messages Page');
  }


  ngOnDestroy() {
    if (this.autoScroller) {
      this.autoScroller.unsubscribe();
      this.autoScroller = undefined;
    }
  }
  ngOnInit() {
    if(this.selectedChat)
    {
      this.idConversation=this.selectedChat.idConversation;
      this.chatService.getMessagesByConversation(this.selectedChat).subscribe(res=>{
        this.messages=res.messages
      });
      this.chatService.getConversationById(this.selectedChat).subscribe(res=>{
        if(res.success)
        {
          if(res.conversation.utilisateur2!=this.loggedUser.id)
          {
            this.receiver=res.conversation.utilisateur2;
          }else
          {
            this.receiver=res.conversation.utilisateur1;
          }
        }else
        {
          this.messageService.showToast(MessagesConstants.erreurServeur);
        }
      });
    }
    //this.scrollToBottom();
    /*this.autoScroller = this.zone.subscribe(() => {
      this.scroller.scrollTop = this.scroller.scrollHeight;
      this.messageEditor.focus();
    });*/

  }
  ngAfterViewChecked() {
    //this.scrollToBottom();
  }
  onInputKeypress(keycode) {
    if (keycode === 13) {
      this.sendMessage();
    }
  }
  sendMessage() {
    let messageToSend = {
      utilisateur:this.loggedUser,
      toUser:this.receiver,
      contenu: this.message,
      article:this.article.idArticle,
      idConversation:this.idConversation,
      dateMessage : new Date(),
      lu:false,
      username:'',
      userId:''
    };
    messageToSend.username = this.loggedUser.prenom +' '+this.loggedUser.nom[0]+'.';
    messageToSend.userId = this.loggedUser.id;
    this.chatService.sendMessage(messageToSend).subscribe(res=>{
      res.message.ownership='mine';
      this.messages.push(res.message);
      this.message = '';
    })
   // this.scrollToBottom();

  }

  goToDetails(article)
  {
    this.navCtrl.push(ArticleDetailsPage, {
      article: article
    });
  }

  scrollToBottom (): void {
    setTimeout(function () {
      let scrollPane = document.getElementById("messages");
      scrollPane.scrollTop = scrollPane.scrollHeight;
    }, 10);
  }
}
