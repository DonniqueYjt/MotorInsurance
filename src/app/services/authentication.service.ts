import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { UtilityService } from './utility.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  accessToken: string;

  constructor(private http: HttpClient, private utility: UtilityService) { }

  login(request) {
    return this.http.get<any>(environment.apiURL + '/Account/validLogin?userName=' + request.username + '&userPassword=' + request.password).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }

}
