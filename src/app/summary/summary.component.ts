import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Quotes } from '../models/response/fetch-quotes-response';
import { SearchObject } from '../models/search.model';
import { SearchService } from '../search/search.service';
import { MotorInsuranceService } from '../services/motor-insurance.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  searchEnquiryId: string;
  searchObject: SearchObject;
  selectedQuote: Quotes;
  constructor(private route: ActivatedRoute, private motorService: MotorInsuranceService, private searchService: SearchService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('searchObject')) {
      this.searchObject = JSON.parse(sessionStorage.getItem('searchObject'));
    } else {
      this.searchObject = this.searchService.searchObject;
    }
    this.route.queryParams.subscribe(params => {
      this.searchEnquiryId = params.enquiryId;
    });
    this.selectedQuote = this.motorService.selectedQuote;
  }

}
