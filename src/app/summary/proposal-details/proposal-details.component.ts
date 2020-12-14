import { Component, OnInit } from '@angular/core';
import { SearchObject } from 'src/app/models/search.model';
import { SearchService } from 'src/app/search/search.service';
import { MotorInsuranceService } from 'src/app/services/motor-insurance.service';
import { Summary } from '../../models/summary.model';
import { Quotes } from '../../models/response/fetch-quotes-response';
@Component({
  selector: 'app-proposal-details',
  templateUrl: './proposal-details.component.html',
  styleUrls: ['./proposal-details.component.scss']
})
export class ProposalDetailsComponent implements OnInit {

  proposalData: Summary;
  searchObject: SearchObject;
  selectedQuote: Quotes;
  constructor(private motorService: MotorInsuranceService, private searchService: SearchService) { }

  ngOnInit() {
    if (sessionStorage.getItem('searchObject')) {
      this.searchObject = JSON.parse(sessionStorage.getItem('searchObject'));
    } else {
      this.searchObject = this.searchService.searchObject;
    }
    this.proposalData = this.motorService.summaryObject;
    this.selectedQuote = this.motorService.selectedQuote;
  }

}
