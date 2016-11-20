/**
 * Created by dana on 11/08/16.
 */

export class Photo{

  private _id:number;
  private _cheminPhoto:string;
  private _typePhoto:string;

  constructor(){

  }


  get idPhoto(): number {
    return this._id;
  }

  set idPhoto(value: number) {
    this._id = value;
  }

  get cheminPhoto(): string {
    return this._cheminPhoto;
  }

  set cheminPhoto(value: string) {
    this._cheminPhoto = value;
  }

  get typePhoto(): string {
    return this._typePhoto;
  }

  set typePhoto(value: string) {
    this._typePhoto = value;
  }
}
