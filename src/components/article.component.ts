

import {Categorie} from "./categorie.component";
import {Devise} from "./devise.component";
import {Utilisateur} from "./utilisateur.component";
import {Photo} from "./photo.component";

export class Article{

  private _idArticle:number;
  private _titre:string;
  private _details:string;
  private _etat:string;
  private _statut:string;
  private _prix:number;
  private _dateAjout:number;
  private _dateModification:string;
  private _nomVille:string;
  private _complementadresse:string;
  private _nomDepartement:string;
  private _nompays:string;
  private _latitude:number;
  private _longitude:number;
  private _nombreDeVue:number;
  private _images:any;
  private _categorie:Categorie;
  private _devise:Devise;
  private _utilisateur:Utilisateur;
  private _photo:Photo;
  private _echangeable:boolean;
  private _negociable:boolean;


  constructor(){

  }


  public get echangeable():boolean {
    return this._echangeable;
  }

  public set echangeable(value:boolean) {
    this._echangeable = value;
  }

  public get negociable():boolean {
    return this._negociable;
  }

  public set negociable(value:boolean) {
    this._negociable = value;
  }

  get idArticle(): number {
    return this._idArticle;
  }

  set idArticle(value: number) {
    this._idArticle = value;
  }

  get titre(): string {
    return this._titre;
  }

  set titre(value: string) {
    this._titre = value;
  }

  get details(): string {
    return this._details;
  }

  set details(value: string) {
    this._details = value;
  }

  get etat(): string {
    return this._etat;
  }

  set etat(value: string) {
    this._etat = value;
  }

  get statut(): string {
    return this._statut;
  }

  set statut(value: string) {
    this._statut = value;
  }

  get prix(): number {
    return this._prix;
  }

  set prix(value: number) {
    this._prix = value;
  }

  get dateAjout(): number {
    return this._dateAjout;
  }

  set dateAjout(value: number) {
    this._dateAjout = value;
  }

  get dateModification(): string {
    return this._dateModification;
  }

  set dateModification(value: string) {
    this._dateModification = value;
  }

  get nomVille(): string {
    return this._nomVille;
  }

  set nomVille(value: string) {
    this._nomVille = value;
  }

  get complementadresse(): string {
    return this._complementadresse;
  }

  set complementadresse(value: string) {
    this._complementadresse = value;
  }

  get nomDepartement(): string {
    return this._nomDepartement;
  }

  set nomDepartement(value: string) {
    this._nomDepartement = value;
  }

  get nompays(): string {
    return this._nompays;
  }

  set nompays(value: string) {
    this._nompays = value;
  }

  get latitude(): number {
    return this._latitude;
  }

  set latitude(value: number) {
    this._latitude = value;
  }

  get longitude(): number {
    return this._longitude;
  }

  set longitude(value: number) {
    this._longitude = value;
  }

  get nombreDeVue(): number {
    return this._nombreDeVue;
  }

  set nombreDeVue(value: number) {
    this._nombreDeVue = value;
  }

  get images(): any {
    return this._images;
  }

  set images(value: any) {
    this._images = value;
  }

  get categorie(): Categorie {
    return this._categorie;
  }

  set categorie(value: Categorie) {
    this._categorie = value;
  }

  get devise(): Devise {
    return this._devise;
  }

  set devise(value: Devise) {
    this._devise = value;
  }

  get utilisateur(): Utilisateur {
    return this._utilisateur;
  }

  set utilisateur(value: Utilisateur) {
    this._utilisateur = value;
  }

  get photo(): Photo {
    return this._photo;
  }

  set photo(value: Photo) {
    this._photo = value;
  }
}
