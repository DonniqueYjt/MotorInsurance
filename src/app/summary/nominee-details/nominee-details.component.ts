import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchObject } from 'src/app/models/search.model';
import { SearchService } from 'src/app/search/search.service';
import { MotorInsuranceService } from 'src/app/services/motor-insurance.service';

@Component({
  selector: 'app-nominee-details',
  templateUrl: './nominee-details.component.html',
  styleUrls: ['./nominee-details.component.scss']
})
export class NomineeDetailsComponent implements OnInit {
  nomineeForm: FormGroup;
  searchEnquiryId: string;
  searchObject: SearchObject;
  constructor(private route: ActivatedRoute,private router:Router,private motorService:MotorInsuranceService, private _fb: FormBuilder, private searchService: SearchService) { }

  ngOnInit() {
    if (sessionStorage.getItem('searchObject')) {
      this.searchObject = JSON.parse(sessionStorage.getItem('searchObject'));
    } else {
      this.searchObject = this.searchService.searchObject;
    }
    this.route.queryParams.subscribe(params => {
      this.searchEnquiryId = params.enquiryId;
    });
    this.nomineeForm = this._fb.group({
      Title: [''],
      NomineeName: [''],
      NomineeRelationship: [''],
      NomineeAge: [''],
      EnquiryNo: [this.searchEnquiryId]
    })
  }
  saveNominee() {
    if (this.nomineeForm.valid) {
      this.motorService.summaryObject.nominee=this.nomineeForm.value;
      this.motorService.insertNomineeDetails(this.nomineeForm.value).subscribe(res => {
        this.router.navigate(['/summary/vehicle'], { queryParams: { enquiryId: this.searchEnquiryId } });
      })
    }
  }

}
