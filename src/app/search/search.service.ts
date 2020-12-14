import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { Manufacturer, Vehicle, Variant, RTO, SearchObject } from '../models/search.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchObject: SearchObject=new SearchObject();

  constructor(private http: HttpClient) { }

  getManufacturer(): Observable<Manufacturer[]> {
    return this.http.get<any>('../../assets/data/manufacture.json').pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    )
  }
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<any>('../../assets/data/vehicles.json').pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    )
  }
  getVariants(): Observable<Variant[]> {
    return this.http.get<any>('../../assets/data/variants.json').pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    )
  }
  getRTOs(): Observable<RTO[]> {
    return this.http.get<any>('../../assets/data/rtos.json').pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    )
  }
  handleError(error) {
    return throwError(error);
  }
}
