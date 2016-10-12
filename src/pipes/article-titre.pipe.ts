/**
 * Created by root on 17/08/16.
 */

import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
  name:'titeCapitalize'
})
export class TiteCapitalize implements PipeTransform{
  transform(title: string, args: any): any {
    return title.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

}
