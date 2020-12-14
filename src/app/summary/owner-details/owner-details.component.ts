import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnedBy } from 'src/app/enums/owned-by.enum';
import { SearchObject } from 'src/app/models/search.model';
import { SearchService } from 'src/app/search/search.service';
import { MotorInsuranceService } from 'src/app/services/motor-insurance.service';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.scss']
})
export class OwnerDetailsComponent implements OnInit {
  visitorForm: FormGroup;
  searchEnquiryId: string;
  searchObject: SearchObject;
  constructor(private route: ActivatedRoute, private router: Router, private motorService: MotorInsuranceService, private _fb: FormBuilder, private searchService: SearchService) { }

  ngOnInit() {
    if (sessionStorage.getItem('searchObject')) {
      this.searchObject = JSON.parse(sessionStorage.getItem('searchObject'));
    } else {
      this.searchObject = this.searchService.searchObject;
    }
    this.route.queryParams.subscribe(params => {
      this.searchEnquiryId = params.enquiryId;
    });
    this.visitorForm = this._fb.group({
      Title: [''],
      CustomerName: [''],
      LastName: [''],
      MobileNo: [''],
      EmailId: [''],
      Gender: [''],
      Occupation: [''],
      MaritalStatus: [''],
      DOB: [''],
      VehicleOwnedBy: [''],
      EnquiryNo: [this.searchEnquiryId]
    })
  }
  saveVisitor() {
    this.visitorForm.patchValue({
      VehicleOwnedBy: OwnedBy[this.visitorForm.value.VehicleOwnedBy] ? OwnedBy[this.visitorForm.value.VehicleOwnedBy] : ''
    })
    if (this.visitorForm.valid) {
      this.motorService.summaryObject.owner=this.visitorForm.value;
      this.motorService.insertVisitorDetails1(this.visitorForm.value).subscribe(res => {
        this.router.navigate(['/summary/address'], { queryParams: { enquiryId: this.searchEnquiryId } });
      })
    }
  }

}
