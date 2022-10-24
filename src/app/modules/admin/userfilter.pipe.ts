import { Pipe, PipeTransform } from '@angular/core';
import { userRegister } from 'src/app/interface/interface';

@Pipe({
  name: 'userfilter'
})
export class UserfilterPipe implements PipeTransform {

  transform(value: userRegister[],filteredString:string)
  {

    if(value.length === 0 || filteredString==='')
    return value;

  const  Parcels = [];
    for ( const parcel of value){
     if(parcel.user_name.toLowerCase().indexOf(filteredString.toLocaleLowerCase())!==-1){
      Parcels.push(parcel)
     }
    }
    return Parcels;  }

}
// ========================================================

