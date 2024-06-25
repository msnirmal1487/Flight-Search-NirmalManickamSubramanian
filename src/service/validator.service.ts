import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  isCitiesNotSameValidator(): ValidatorFn{
    return (g: AbstractControl): ValidationErrors | null  => {
      if (g.get('departureCity')?.invalid || g.get('destinationCity')?.invalid){
        return null;
      }
      if (g.get('departureCity')?.value !== g.get('destinationCity')?.value){
        return null;
      }
      return {["citiesMatch"]: true};  
      
    }
    
  }

  isDateValid(): ValidatorFn{
    return (d: AbstractControl): ValidationErrors | null  => {
      const startTime = new Date()
      startTime.setHours(0,0,0,0)
      if(new Date(d.value).getTime() >= startTime.getTime()){
        return null;  
      }
      
      return {["invalidTime"]: true}
      
    }
    
  }
}
