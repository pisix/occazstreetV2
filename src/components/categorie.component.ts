/**
 * Created by dana on 11/08/16.
 */

export class Categorie{

  private _idCategorie:number;
  private _libelle:string;
  private _statut:string;

  constructor(){

  }


  get idCategorie(): number {
    return this._idCategorie;
  }

  set idCategorie(value: number) {
    this._idCategorie = value;
  }

  get libelle(): string {
    return this._libelle;
  }

  set libelle(value: string) {
    this._libelle = value;
  }

  get statut(): string {
    return this._statut;
  }

  set statut(value: string) {
    this._statut = value;
  }
}
