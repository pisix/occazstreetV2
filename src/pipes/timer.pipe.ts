/**
 * Created by root on 17/08/16.
 */

import {Pipe, PipeTransform} from "@angular/core";


@Pipe({
  name:'occasStreetTimer'
})
export class OccasStreetTimer implements PipeTransform{

  private terms = [
    {
      time:10,
      divide:1,
      text:"%d secondes"
    },
    {
      time:45,
      divide:60,
      text:'moins d\'une minute'
    },
    {
      time:90,
      divide:60,
      text:'environ une minute'
    },
    {
      time:45 *60,
      divide:60,
      text:"%d minutes"
    },
    {
      time:90 * 60 ,
      divide:60 * 60,
      text:"environ une heure"
    },
    {
      time:24 * 60 * 60,
      divide:60 * 60,
      text:"%d heurs"
    },
    {
      time:30 * 24 * 60 * 60,
      divide:24 * 60 * 60,
      text:"%d jours"
    },{
      time:45*24*60*60,
      divide:24 * 60 * 60 * 30,
      text:"environ un mois"
    },{
      time:365*24*60*60,
      divide:24*60*60*30,
      text:"%d mois"
    },{
      time:365*1.5*24*60*60,
      divide:24*60*60*365,
      text:"environ un an"
    },{
      time:Infinity,
      divide:24*60*60*365,
      text:"%d ans"
    },
  ];

  transform(date: string, args: any): string {

    let seconde = Math.round(((new Date(Date.now()).getTime())- (new Date(date).getTime()))/1000);

    let wording = "Il y a ";
    let term = null;

    for(term of this.terms){
      if(seconde < term.time){
        break;
      }
    }

    wording += term.text.replace('%d',Math.round(seconde/term.divide));

    return wording;
  }

}
