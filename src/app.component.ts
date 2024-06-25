import { Component, OnInit, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CitiesService, City } from './cities.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
import { config } from 'rxjs';
import { ValidatorService } from './service/validator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  readonly dialog = inject(MatDialog);
  readonly citiesService = inject(CitiesService);
  readonly validatorService = inject(ValidatorService);
  
  departureCityLabel = 'Departure City'
  destinationCityLabel = 'Destination City'
  travelDatesLabel = 'Travel Dates'
  departureCities: City[] = [];
  destinationCities: City[] = [];
  minDate=new Date()

  isFormInvalid: boolean = false;

  flightSearchForm
  departureCity = new FormControl('', [])
  destinationCity = new FormControl('', [Validators.required, this.validatorService.isCitiesSameValidator(this.departureCity)])
  
  travelDateStart = new FormControl('', [Validators.required, Validators.maxLength(10), this.validatorService.isDateValid()])
  travelDateEnd = new FormControl('', [Validators.required, Validators.maxLength(10), this.validatorService.isDateValid()])

  constructor() {
    this.departureCity.addValidators([Validators.required, this.validatorService.isCitiesSameValidator(this.destinationCity)]);

    this.flightSearchForm = new FormGroup({departureCity: this.departureCity, 
      destinationCity: this.destinationCity, 
      travelDateStart: this.travelDateStart, 
      travelDateEnd: this.travelDateEnd})
  }

  ngOnInit(): void {
    
    this.citiesService.getCities().subscribe(cities => {
      this.departureCities = [...cities];
      this.destinationCities = [...cities];
    })
  }

  onSubmit(event: any){
    event.preventDefault();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {
        width: '400px',
        disableClose: true
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      if (res){
        const currentUrl = window.location.href ;
        window.location.href = currentUrl;
      }
    });
  }

  swapCities(){
    const departureCityOld = this.departureCity.value ;
    this.departureCity.setValue(this.destinationCity.value)
    this.destinationCity.setValue(departureCityOld)
  }

  disallowTyping(key: KeyboardEvent){
    return false;
  }
}
