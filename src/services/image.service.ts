
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {GlobalsConstants} from "../../src/constants/globals.constants";
import {Transfer} from "ionic-native";


@Injectable()
export class ImageService{


  constructor(private http: Http) {

  }

  upload(image:string,article :string){
    let ft = new Transfer();
    let options = {
      fileKey: 'file',
      fileName: image,
      mimeType: 'image/png',
      chunkedMode: false,
      idArticle: article,
      headers: {
        'Content-Type' : undefined
      },
      params: {
        fileName: image,
        idArticle: article,
      }
    };
    return ft.upload(image, GlobalsConstants.urlServer + GlobalsConstants.port + '/article/uploadImage', options)
  }
}
