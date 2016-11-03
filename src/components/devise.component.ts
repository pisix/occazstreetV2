/**
 * Created by dana on 11/08/16.
 */

export class Devise{

  private _id:number;
  private _libelle:string;
  private _symbole:string;
  private _code:string;
  private _statut:string;

  constructor(){

  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get libelle(): string {
    return this._libelle;
  }

  set libelle(value: string) {
    this._libelle = value;
  }

  get symbole(): string {
    return this._symbole;
  }

  set symbole(value: string) {
    this._symbole = value;
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  get statut(): string {
    return this._statut;
  }

  set statut(value: string) {
    this._statut = value;
  }
}
