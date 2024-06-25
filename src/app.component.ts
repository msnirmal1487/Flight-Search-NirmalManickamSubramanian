import { Component, OnInit, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CitiesService, City } from './cities.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
import { config } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  readonly dialog = inject(MatDialog);
  readonly citiesService = inject(CitiesService);
  
  departureCityLabel = 'Departure City'
  destinationCityLabel = 'Destination City'
  travelDatesLabel = 'Travel Dates'
  departureCities: City[] = [];
  destinationCities: City[] = [];

  isFormInvalid: boolean = false;

  flightSearchForm
  departureCity = new FormControl('', [Validators.required])
  destinationCity = new FormControl('', [Validators.required, this.isCitiesNotSameValidator])
  citiesFormGroup
  travelDateStart = new FormControl('', [Validators.required])
  travelDateEnd = new FormControl('', [Validators.required])

  constructor() {
    this.citiesFormGroup = new FormGroup({ departureCity: this.departureCity, destinationCity: this.destinationCity }, { validators: this.isCitiesNotSameValidator });
    this.citiesFormGroup.setValidators(this.isCitiesNotSameValidator)
    this.flightSearchForm = new FormGroup({citiesFormGroup: this.citiesFormGroup, travelDateStart: this.travelDateStart, travelDateEnd: this.travelDateEnd})
  }

  ngOnInit(): void {
    this.citiesService.getCities().subscribe(cities => {
      this.departureCities = [...cities];
      this.destinationCities = [...cities];
    })
  }

  checkFormValidity(){
    console.log("is Form Valid")
    this.citiesFormGroup.updateValueAndValidity();
    this.isFormInvalid = this.departureCity.invalid || this.destinationCity.invalid || this.travelDateStart.invalid || this.travelDateEnd.invalid;
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

  isCitiesNotSameValidator(): ValidatorFn{
    return (g: AbstractControl): ValidationErrors | null  => {
      console.log('isCitiesNotSameValidator')
      if (g.get('departureCity')?.value !== g.get('destinationCity')?.value){
        console.log('isCitiesNotSameValidator cities do not match' )
        return null;
      }
      return {["citiesMatch"]: true};  
      
    }
    
  }
}
