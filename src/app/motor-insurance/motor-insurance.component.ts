import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quotes } from '../models/response/fetch-quotes-response';
import { SearchObject } from '../models/search.model';
import { SearchService } from '../search/search.service';
import { MotorInsuranceService } from '../services/motor-insurance.service';
declare var $;

@Component({
  selector: 'app-motor-insurance',
  templateUrl: './motor-insurance.component.html',
  styleUrls: ['./motor-insurance.component.scss']
})
export class MotorInsuranceComponent implements OnInit {
  searchEnquiryId: string;
  quotesList: Quotes[] = [];
  quoteListGroup: any[] = [];

  searchObject: SearchObject;
  constructor(private motorService: MotorInsuranceService, private searchService: SearchService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('searchObject')) {
      this.searchObject = JSON.parse(sessionStorage.getItem('searchObject'));
    } else {
      this.searchObject = this.searchService.searchObject;
    }
    this.route.queryParams.subscribe(params => {
      this.searchEnquiryId = params.enquiryId;
    });
    $('.airlinepriceslider').slick({
      slidesToShow: 8,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
          }
        }
      ]
    });
    $('#filterSidebarmob .nav-pills .nav-item .nav-link').click((e) => {

      $('#filterSidebarmob .tab-content .collapse').each((index, element) => {
        if ('#' + $(element).attr("id") != $(e.currentTarget).attr("href"))
          $(element).removeClass("show");
      });
      if ($('#filterSidebarmob .tab-content .collapse.show').length == 0) {
        $('#applyFilter').css('display', 'block');
        $('#applyFilterText').css('display', 'none');
      } else {
        $('#applyFilter').css('display', 'none');
        $('#applyFilterText').css('display', 'block');
      }
    });
    this.motorService.fetchQuotes(this.searchEnquiryId).subscribe(res => {
      this.quotesList = res;
      this.quoteListGroup = this.groupBy(this.quotesList, function (item) { return [item.SupplierId]; });
    });
  }
  bookNow(quote: Quotes) {
    this.motorService.selectedQuote = quote;
    this.motorService.savePlan(this.searchEnquiryId, this.motorService.selectedQuote.PlanId).subscribe(res => {
      this.router.navigate(['/summary/owner'], { queryParams: { enquiryId: this.searchEnquiryId } });
    })
  }
  groupBy(array, f) {
    var groups = {};
    if (array != null)
      array.forEach(function (o) {
        var group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
      });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    })
  }
}
