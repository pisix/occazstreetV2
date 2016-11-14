/**
 * Created by root on 14/10/16.
 */


import {Injectable} from "@angular/core";
import { SocialSharing } from 'ionic-native';

@Injectable()
export class MediaSharing{

  constructor() {

  }

  shareViaEmail(message:string, subject:string, to:Array<string>, cc?, bcc?, files?):any{
    return SocialSharing.shareViaEmail(message, subject, to, cc, bcc, files);
  }

  shareTwitter(message:string,image:string,link:string):any{
    return SocialSharing.shareViaTwitter(message,image,link);
  }

  shareViaFacebook(message:string,image:string,link:string):any{
    return SocialSharing.shareViaFacebook(message,image,link);
  }

  shareViaWhatsApp(message:string,image?:string,link?:string):any{
    return SocialSharing.shareViaWhatsApp(message,image,link);
  }

  shareViaSMS(message:string,phoneNumber?:string):any{
    return SocialSharing.shareViaSMS(message,phoneNumber);
  }

  shareViaInstagram(message:string,image?:string):any{
    return SocialSharing.shareViaInstagram(message,image);
  }

}
