import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UtilityService } from './utility.service';
import { InsertQuoteRequest } from '../models/request/insert-quotes-request.model';
import { Quotes } from '../models/response/fetch-quotes-response';
import { InsertVisitorDetails1Request, InsertVisitorDetailsRequest } from '../models/request/insert-visitor-details-request.model';
import { InsertNomineeDetails } from '../models/request/insert-nominee-details.model';
import { InsertVehicleDetails } from '../models/request/insert-vehicle-details.model';
import { Summary } from '../models/summary.model';
@Injectable({
  providedIn: 'root'
})
export class MotorInsuranceService {

  selectedQuote: Quotes;
  summaryObject: Summary = new Summary();

  constructor(private http: HttpClient, private utility: UtilityService) { }

  searchMotorInsurance(request: InsertQuoteRequest): Observable<string> {
    return this.http.post<any>(environment.apiURL + '/PreQuote/SaveDetails', request).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }

  fetchQuotes(enquiryId: string) {
    return this.http.get<any>(environment.apiURL + '/quote/FetchQuotes?enquiryNo=' + enquiryId).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }

  savePlan(enquiryId: string, planId: number) {
    return this.http.post<any>(environment.apiURL + `/proposal/SavePlan?EnquiryNo=${enquiryId}&planid=${planId}`,{}).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }

  insertVisitorDetails1(insertVisitor: InsertVisitorDetailsRequest) {
    return this.http.post<any>(environment.apiURL + `/proposal/InsertVisitorDetails`, insertVisitor).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
  insertVisitorDetails2(insertVisitor: InsertVisitorDetails1Request) {
    return this.http.post<any>(environment.apiURL + `/proposal/InsertVisitorDetails`, insertVisitor).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }

  insertNomineeDetails(nominee: InsertNomineeDetails) {
    return this.http.post<any>(environment.apiURL + `/proposal/InsertNomineeDetails`, nominee).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }

  insertVehicleAdditionalDetails(vehicle: InsertVehicleDetails) {
    return this.http.post<any>(environment.apiURL + `/proposal/InsertVehicleAdditionalDetails`, vehicle).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
  // getMotorInsuranceById(request: GetMotorRequestModel) {
  //   return this.http.post<any>(environment.apiURL + '/MotorGetResultByEnquiryNo', request).pipe(
  //     catchError((error: HttpErrorResponse) => this.utility.handleError(error))
  //   )
  // }

  // sendEmail(request: SendEmailRequestModel) {
  //   return this.http.post<any>(environment.apiURL + '/MotorSendEmail', request).pipe(
  //     catchError((error: HttpErrorResponse) => this.utility.handleError(error))
  //   )
  // }

  // sendSMS(request: SendSmsRequestModel) {
  //   return this.http.post<any>(environment.apiURL + '/MotorSendSMS', request).pipe(
  //     catchError((error: HttpErrorResponse) => this.utility.handleError(error))
  //   )
  // }
  // getMotorPlanSelected(request: MotorPlanSelectedRequestModel) {
  //   return this.http.post<any>(environment.apiURL + '/MotorPlanSelected', request).pipe(
  //     catchError((error: HttpErrorResponse) => this.utility.handleError(error))
  //   )
  // }

  // postMotorProposalForm() {
  //   return this.http.post<any>(environment.apiURL + '/MotorProposalForm', this.MotorProposalReqest).pipe(
  //     catchError((error: HttpErrorResponse) => this.utility.handleError(error))
  //   )
  // }

  // getMotorPGResponse(request: MotorPGRequestModel) {
  //   return this.http.post<any>(environment.apiURL + '/MotorPGResponse', request).pipe(
  //     catchError((error: HttpErrorResponse) => this.utility.handleError(error))
  //   )
  // }

  // getMotorDownloadPolicy(request: MotorDownloadPolicyRequestModel) {
  //   return this.http.post<any>(environment.apiURL + '/MotorDownloadPolicy', request).pipe(
  //     catchError((error: HttpErrorResponse) => this.utility.handleError(error))
  //   )
  // }

  // getMotorLead(request: MotorLeadRequest) {
  //   return this.http.post<any>(environment.apiURL + '/MotorLead', request).pipe(
  //     catchError((error: HttpErrorResponse) => this.utility.handleError(error))
  //   )
  // }

  // getComparisonResult(request: GetComparisonRequestModel) {
  //   return this.http.post<any>(environment.apiURL + '/MotorComparision', request).pipe(
  //     catchError((error: HttpErrorResponse) => this.utility.handleError(error))
  //   )
  // }

  // getMotorQuestion(request: GetMotorQuestionRequestModel) {
  //   return this.http.post<any>(environment.apiURL + '/MotorGetQuestion', request).pipe(
  //     catchError((error: HttpErrorResponse) => this.utility.handleError(error))
  //   )
  // }

  // getPremium(request: GetPremiumRequest) {
  //   return this.http.post<any>(environment.apiURL + '/MotorNYearGetPremium', request).pipe(
  //     catchError((error: HttpErrorResponse) => this.utility.handleError(error))
  //   )
  // }

  // getOtherPlanPremium() {
  //   return this.http.post<any>(environment.apiURL + '/MotorGetOtherPlanPremium', this.searchObject).pipe(
  //     catchError((error: HttpErrorResponse) => this.utility.handleError(error))
  //   )
  // }

  // getUpdateOtherPlanPremium(request: MotorUpdateOtherPremiumRequest) {
  //   return this.http.post<any>(environment.apiURL + '/MotorUpdateOtherPlanPremium', request).pipe(
  //     catchError((error: HttpErrorResponse) => this.utility.handleError(error))
  //   )
  // }

  // storeContactDetail(request:MotorUpdateContactDetail){
  //   return this.http.post<any>(environment.apiURL + '/MotorStoreContactDetail', request).pipe(
  //     catchError((error: HttpErrorResponse) => this.utility.handleError(error))
  //   )
  // }

  // generateAge(type: string) {
  //   let result = [];
  //   let lowerLimit: number;
  //   let upperLimit: number = 100;
  //   switch (type) {
  //     case AgeType.Senior:
  //       lowerLimit = 60;
  //       break;
  //     case AgeType.Child:
  //       lowerLimit = 1;
  //       upperLimit = 25;
  //       result.push('< 1');
  //       break;
  //     case AgeType.Adult:
  //       lowerLimit = 18;
  //       break;
  //   }
  //   for (; lowerLimit <= upperLimit; lowerLimit++) {
  //     result.push(lowerLimit);
  //   }
  //   return result;
  // }

}
