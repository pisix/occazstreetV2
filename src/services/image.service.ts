
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {GlobalsConstants} from "../../src/constants/globals.constants";
import {Transfer} from "ionic-native";


@Injectable()
export class ImageService{


  constructor(private http: Http) {

  }

  upload(image:string){
    let ft = new Transfer();
    let options = {
      fileKey: 'file',
      fileName: image,
      mimeType: 'image/png',
      chunkedMode: false,
      headers: {
        'Content-Type' : undefined
      },
      params: {
        fileName: image
      }
    };
    return ft.upload(image, GlobalsConstants.urlServer + GlobalsConstants.port + '/article/uploadImage', options)
  }
}
