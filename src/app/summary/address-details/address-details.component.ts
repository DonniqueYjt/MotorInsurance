import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchObject } from 'src/app/models/search.model';
import { SearchService } from 'src/app/search/search.service';
import { MotorInsuranceService } from 'src/app/services/motor-insurance.service';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit {
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
      PanNumber: [''],
      AadharNo: [''],
      Address1: [''],
      Address2: [''],
      Address3: [''],
      StateId: [''],
      CityId: [''],
      PostCode: [''],
      EnquiryNo: [this.searchEnquiryId]
    })

  }
  saveVisitor() {
    if (this.visitorForm.valid) {
      this.motorService.summaryObject.address=this.visitorForm.value;
      this.motorService.insertVisitorDetails2(this.visitorForm.value).subscribe(res => {
        this.router.navigate(['/summary/nominee'], { queryParams: { enquiryId: this.searchEnquiryId } });
      })
    }
  }
}
