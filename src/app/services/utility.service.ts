import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
// var inlineCSS = require('inline-css');
// var options = {
//   applyLinkTags: true
// }

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  encPassword: string = 'Test';
  decPassword: string = 'Test';

  constructor(private http: HttpClient) { }

  validatePincodeExists(pincode: number) {
    return this.http.get<any>('assets/data/pincode.json').pipe(
      map((data) => data.filter(f => f.pincode == pincode)),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    )
  }

 
  scrollToFirstInvalidControl(el) {
    const firstInvalidControl: HTMLElement = el.nativeElement.querySelector(
      "form .ng-invalid"
    );
    firstInvalidControl.focus(); //without smooth behavior
  }


  getImageFromAssets(fileName) {
    return this.http.get<Blob>('../../assets/images/logo-insurance/' + fileName + '.png', { responseType: 'blob' as 'json' }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    )
  }

  encryptObject(input) {
    return CryptoJS.AES.encrypt(input.trim(), this.encPassword.trim()).toString();
  }

  decryptObject(input) {
    return CryptoJS.AES.decrypt(input.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
  }

  handleError(error) {
    return throwError(error);
  }
}
