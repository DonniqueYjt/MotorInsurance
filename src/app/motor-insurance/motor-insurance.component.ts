import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parse } from 'path';
import { InsertQuoteRequest } from '../models/request/insert-quotes-request.model';
import { Quotes } from '../models/response/fetch-quotes-response';
import { Manufacturer, RTO, SearchObject, Variant, Vehicle } from '../models/search.model';
import { SearchService } from '../search/search.service';
import { MotorInsuranceService } from '../services/motor-insurance.service';
declare var $;

@Component({
  selector: 'app-motor-insurance',
  templateUrl: './motor-insurance.component.html',
  styleUrls: ['./motor-insurance.component.scss'],
  providers: [DatePipe]
})
export class MotorInsuranceComponent implements OnInit {
  searchEnquiryId: string;
  quotesList: Quotes[] = [];
  quoteListGroup: any[] = [];
  manufacturerList: Manufacturer[] = [];
  vehicleList: Vehicle[] = [];
  variantList: Variant[] = [];
  rtoList: RTO[] = [];
  searchObject: SearchObject;
  searchRequest: InsertQuoteRequest;
  yearList: number[] = [
    2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001
  ]

  selectedManufacturer: number = 0;
  selectedVehicle: number = 0;
  selectedVariant: number = 0;
  selectedRTO: number = 0;
  selectedFuel: string = "0";
  selectedYear: number = 0;
  constructor(private motorService: MotorInsuranceService, private datePipe: DatePipe, private searchService: SearchService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('searchObject')) {
      this.searchObject = JSON.parse(sessionStorage.getItem('searchObject'));
    } else {
      this.searchObject = this.searchService.searchObject;
    }
    if (sessionStorage.getItem('searchRequest')) {
      this.searchRequest = JSON.parse(sessionStorage.getItem('searchRequest'));
      this.selectedManufacturer = parseInt(this.searchRequest.MakeID);
      this.getVehicleList();
      this.selectedVehicle = parseInt(this.searchRequest.ModelId);
      this.getVariantList();
      this.selectedVariant = parseInt(this.searchRequest.VariantID);
      this.selectedRTO = parseInt(this.searchRequest.RegistrationRTOCode);
      this.selectedFuel = this.searchRequest.FuelID;
      this.selectedYear = parseInt(this.searchRequest.RegistrationDate.split('-')[0]);
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
    this.getManufactureList();
    this.getRTOList();
  }
  getManufactureList() {
    this.searchService.getManufacturer().subscribe(res => {
      this.manufacturerList = res;
    })
  }

  getVehicleList() {
    this.searchService.getVehicles().subscribe(res => {
      this.vehicleList = res.filter(f => parseInt(f.ManufacturerID) == this.selectedManufacturer);
    })
  }

  getVariantList() {
    this.searchService.getVariants().subscribe(res => {
      this.variantList = res.filter(f => parseInt(f.VehicleID) == this.selectedVehicle);
    })
  }
  getRTOList() {
    this.searchService.getRTOs().subscribe(res => {
      this.rtoList = res;
    })
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
  searchQuotes() {
    this.searchRequest.MakeID = this.selectedManufacturer.toString();
    this.searchRequest.ModelId = this.selectedVehicle.toString();
    this.searchRequest.VariantID = this.selectedVariant.toString();
    this.searchRequest.FuelID = this.selectedFuel;
    this.searchRequest.RegistrationDate = this.datePipe.transform(new Date('01-01-' + this.selectedYear), 'yyyy-MM-dd');
    this.searchRequest.ManufacturingDate = this.datePipe.transform(new Date('01-01-' + this.selectedYear), 'yyyy-MM-dd');
    this.searchRequest.RegistrationRTOCode = this.selectedRTO.toString();
    this.motorService.searchMotorInsurance(this.searchRequest).subscribe(res => {
      sessionStorage.setItem('searchRequest', JSON.stringify(this.searchRequest))
      if (res) {
        this.router.navigate(['/motor-insurance'], { queryParams: { enquiryId: res } });
      }
    })
  }
}
