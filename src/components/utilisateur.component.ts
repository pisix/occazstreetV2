/**
 * Created by dana on 11/08/16.
 */

export class Utilisateur{

  private _id:number;
  private _sexe:string;
  private _nom:string;
  private _prenom:string;
  private _dateDeNaissance:string;
  private _email:string;
  private _confirmEmail:string;
  private _confirmTel:string;
  private _dateInscription:string;
  private _statut:string;
  private _telephone:string;
  private _dateDerniereConnexion:string;
  private _provider:string;
  private _oauthUserId:any;
  private _nomVille:string;
  private _nomPays:string;
  private _afficherTel:string;
  private _photo:any;

  constructor(){

  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get sexe(): string {
    return this._sexe;
  }

  set sexe(value: string) {
    this._sexe = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get prenom(): string {
    return this._prenom;
  }

  set prenom(value: string) {
    this._prenom = value;
  }

  get dateDeNaissance(): string {
    return this._dateDeNaissance;
  }

  set dateDeNaissance(value: string) {
    this._dateDeNaissance = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get confirmEmail(): string {
    return this._confirmEmail;
  }

  set confirmEmail(value: string) {
    this._confirmEmail = value;
  }

  get confirmTel(): string {
    return this._confirmTel;
  }

  set confirmTel(value: string) {
    this._confirmTel = value;
  }

  get dateInscription(): string {
    return this._dateInscription;
  }

  set dateInscription(value: string) {
    this._dateInscription = value;
  }

  get statut(): string {
    return this._statut;
  }

  set statut(value: string) {
    this._statut = value;
  }

  get telephone(): string {
    return this._telephone;
  }

  set telephone(value: string) {
    this._telephone = value;
  }

  get dateDerniereConnexion(): string {
    return this._dateDerniereConnexion;
  }

  set dateDerniereConnexion(value: string) {
    this._dateDerniereConnexion = value;
  }

  get provider(): string {
    return this._provider;
  }

  set provider(value: string) {
    this._provider = value;
  }

  get oauthUserId(): any {
    return this._oauthUserId;
  }

  set oauthUserId(value: any) {
    this._oauthUserId = value;
  }

  get nomVille(): string {
    return this._nomVille;
  }

  set nomVille(value: string) {
    this._nomVille = value;
  }

  get nomPays(): string {
    return this._nomPays;
  }

  set nomPays(value: string) {
    this._nomPays = value;
  }

  get afficherTel(): string {
    return this._afficherTel;
  }

  set afficherTel(value: string) {
    this._afficherTel = value;
  }

  get photo(): any {
    return this._photo;
  }

  set photo(value: any) {
    this._photo = value;
  }
}
