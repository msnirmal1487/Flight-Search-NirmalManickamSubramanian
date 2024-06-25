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
  departureCity = new FormControl('', [Validators.required])
  destinationCity = new FormControl('', [Validators.required])
  citiesFormGroup
  travelDateStart = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), this.validatorService.isDateValid()])
  travelDateEnd = new FormControl('', [Validators.required])

  constructor() {
    this.citiesFormGroup = new FormGroup({ departureCity: this.departureCity, destinationCity: this.destinationCity }, { validators: this.validatorService.isCitiesNotSameValidator() });

    this.flightSearchForm = new FormGroup({citiesFormGroup: this.citiesFormGroup, travelDateStart: this.travelDateStart, travelDateEnd: this.travelDateEnd})
  }

  ngOnInit(): void {
    this.citiesService.getCities().subscribe(cities => {
      this.departureCities = [...cities];
      this.destinationCities = [...cities];
    })
  }

  checkFormValidity(){
    // console.log("is Form Valid")
    // this.citiesFormGroup.updateValueAndValidity();
    // this.isFormInvalid = this.departureCity.invalid || this.destinationCity.invalid || this.travelDateStart.invalid || this.travelDateEnd.invalid;
  }

  onSubmit(event: any){
    event.preventDefault();
    console.log("onSubmit")
    console.log(this.departureCity.value)
    console.log(this.destinationCity.value)
    console.log(this.travelDateStart.value)
    console.log(this.travelDateEnd.value)
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {
        width: '400px',
        disableClose: true
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.departureCity.reset();
        this.destinationCity.reset();
        this.travelDateStart.reset();
        this.travelDateEnd.reset();
      }
    });
  }

  allowOnlyValidKeys(key: KeyboardEvent){
    if (key.key === 'Backspace' || key.key === 'Delete') {
      return true;
    }

    return new RegExp('^[0-9/]+$').test(key.key);
  }
}
