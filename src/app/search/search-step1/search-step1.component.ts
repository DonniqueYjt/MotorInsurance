import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoverType } from 'src/app/enums/cover-type.enum';
import { VehicleType } from 'src/app/enums/vehicle-type.enum';
import { SearchService } from '../search.service';
declare var $;

@Component({
  selector: 'app-search-step1',
  templateUrl: './search-step1.component.html',
  styleUrls: ['./search-step1.component.scss']
})
export class SearchStep1Component implements OnInit {

  vehicleType: string;
  coverType: string;

  constructor(private router: Router, private searchService: SearchService) {
    if (sessionStorage.getItem('searchObject')) {
      this.searchService.searchObject = JSON.parse(sessionStorage.getItem('searchObject'));
      switch (this.searchService.searchObject.vehicleType) {
        case 0:
          this.vehicleType = 'PVTCAR';
          break;
        case 1:
          this.vehicleType = 'COMMERCIAL';
          break;
        case 2:
          this.vehicleType = 'MISC';
          break;
        case 3:
          this.vehicleType = 'GCV';
          break;
      }
      switch (this.searchService.searchObject.coverType) {
        case 0:
          this.coverType = 'COMPREHENSIVE';
          break;
        case 2:
          this.coverType = 'THIRDPARTY';
          break;
      }
    }
  }

  ngOnInit(): void {
    $(function () {
      $("input[name='carradiobannerone']").click(function () {
        if ($("#gcvmaindiv").is(":checked")) {
          $(".showdivgcvmaindiv").show();
        } else {
          $(".showdivgcvmaindiv").hide();
        }
      });

      $("input[name='carradiobannerone']").click(function () {
        if ($("#PCVmaindiv").is(":checked")) {
          $(".showdivPCVmaindiv").show();
        } else {
          $(".showdivPCVmaindiv").hide();
        }
      });

      $("input[name='carradiobannerone']").click(function () {
        if ($("#MiscVehiclemaindiv").is(":checked")) {
          $(".showdivMiscVehiclemaindiv").show();
        } else {
          $(".showdivMiscVehiclemaindiv").hide();
        }
      });
    });
  }
  moveToStep2() {
    this.searchService.searchObject.vehicleType = VehicleType[this.vehicleType];
    this.searchService.searchObject.coverType = CoverType[this.coverType];
    sessionStorage.setItem('searchObject', JSON.stringify(this.searchService.searchObject));
    this.router.navigate(['/search/step2'], { state: { vehicleType: VehicleType[this.vehicleType], coverType: CoverType[this.coverType] } });
  }

}
