import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CITIES } from './cities-data.const';

@Injectable()
export class CitiesService {
  getCities(): Observable<{ name: string; value: string }[]> {
    return of(CITIES);
  }
}
