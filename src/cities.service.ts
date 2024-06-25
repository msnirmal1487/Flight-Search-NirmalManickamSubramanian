import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CITIES } from './cities-data.const';

export interface City {
  name: string;
  value: string;
}

@Injectable()
export class CitiesService {
  getCities(): Observable<City[]> {
    return of(CITIES);
  }
}
