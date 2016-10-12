

import {Categorie} from "./categorie.component";
import {Devise} from "./devise.component";
import {Utilisateur} from "./utilisateur.component";

export class Article{

  private idArticle:number;
  private titre:string;
  private details:string;
  private etat:string;
  private statut:string;
  private prix:number;
  private dateAjout:number;
  private dateModification:string;
  private nomVille:string
  private complementadresse:string;
  private nomDepartement:string;
  private nompays:string;
  private latitude:number;
  private longitude:number;
  private nombreDeVue:number;
  private images:any;
  private categorie:Categorie;
  private devise:Devise;
  private utilisateur:Utilisateur;

  constructor(){

  }
}
