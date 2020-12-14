import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchObject } from 'src/app/models/search.model';
import { SearchService } from 'src/app/search/search.service';
import { MotorInsuranceService } from 'src/app/services/motor-insurance.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {
  vehicleForm: FormGroup;
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
    this.vehicleForm = this._fb.group({
      PreviousInsurerId: [''],
      PreviousPolicyNumber: [''],
      RegistrationNumber: [''],
      ChasisNumber: [''],
      EngineNumber: [''],
      IsUnderLoan: [''],
      VehicleOwnedBy: [''],
      EnquiryNo: [this.searchEnquiryId]
    })
  }
  saveVehicle() {
    if (this.vehicleForm.valid) {
      this.motorService.summaryObject.vehicle = this.vehicleForm.value;
      this.motorService.insertVehicleAdditionalDetails(this.vehicleForm.value).subscribe(res => {
        this.router.navigate(['/summary/proposal'], { queryParams: { enquiryId: this.searchEnquiryId } });
      })
    }
  }

}
