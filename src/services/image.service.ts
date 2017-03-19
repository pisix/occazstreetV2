
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {GlobalsConstants} from "../../src/constants/globals.constants";
import {Transfer} from "ionic-native";


@Injectable()
export class ImageService{


  constructor(private http: Http) {

  }

  upload(image:string,article :string):any{
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

  updateImage(image:string,article :string,idImage:string,oldFileName:string):any{
    console.log(idImage);
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
        fileName: image,
        idArticle: article,
        idImage:idImage,
        oldFileName:oldFileName
      }
    };
    return ft.upload(image, GlobalsConstants.urlServer + GlobalsConstants.port + '/article/updateImage', options)
  }
}
