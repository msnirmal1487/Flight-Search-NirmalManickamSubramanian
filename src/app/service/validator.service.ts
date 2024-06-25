import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  isCitiesNotSameValidator(control1: string, control2: string): ValidatorFn{
    return (g: AbstractControl): ValidationErrors | null  => {

      if (g.get(control1)?.invalid || g.get(control2)?.invalid){
        return null;
      }
      if (g.get(control1)?.value !== g.get(control2)?.value){
        return null;
      }
      return {["citiesMatch"]: true};  
      
    }
    
  }

  isCitiesSameValidator(departureCity: FormControl){
    return (control: AbstractControl): ValidationErrors | null => {

      if(!!departureCity.value && !!control.value && departureCity.value.length > 0 && control.value.length > 0 && departureCity.value === control.value) {
        departureCity.setErrors({["citiesMatch"]: true});  
        return {["citiesMatch"]: true};  
      }
      if(departureCity.errors && departureCity.errors['citiesMatch']){
        departureCity.setErrors(null)
      }
      return null;
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
