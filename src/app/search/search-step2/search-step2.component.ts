import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Manufacturer, Vehicle, Variant, RTO } from 'src/app/models/search.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MotorInsuranceService } from 'src/app/services/motor-insurance.service';
import { InsertQuoteRequest } from 'src/app/models/request/insert-quotes-request.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-step2',
  templateUrl: './search-step2.component.html',
  styleUrls: ['./search-step2.component.scss'],
  providers: [DatePipe]
})
export class SearchStep2Component implements OnInit {

  manufacturerList: Manufacturer[] = [];
  vehicleList: Vehicle[] = [];
  variantList: Variant[] = [];
  rtoList: RTO[] = [];
  rtoFilterList: RTO[] = [];
  isShowManufacture: boolean = true;
  isShowModel: boolean = false;
  isShowFuelType: boolean = false;
  isShowVariant: boolean = false;
  isShowRegistrationYear: boolean = false;
  isShowRto: boolean = false;
  isShowDetails: boolean = false;
  isShowAutoComplete: boolean = false;

  searchForm: FormGroup;
  maxDate: string = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  vehicleType: number;
  coverType: number;
  yearList: number[] = [
    2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001
  ]

  constructor(private searchService: SearchService, private datePipe: DatePipe, private router: Router, private _fb: FormBuilder, private motorService: MotorInsuranceService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.vehicleType = this.router.getCurrentNavigation().extras.state.vehicleType;
      this.coverType = this.router.getCurrentNavigation().extras.state.coverType;
    }
    if (sessionStorage.getItem('searchObject')) {
      this.searchService.searchObject = JSON.parse(sessionStorage.getItem('searchObject'));
      this.vehicleType = this.searchService.searchObject.vehicleType;
      this.coverType = this.searchService.searchObject.coverType;
    }
  }

  ngOnInit(): void {
    this.searchForm = this._fb.group({
      TypeOfPolicy: ['2'],
      MakeID: [''],
      FuelID: [''],
      VariantID: [''],
      RegistrationRTOCode: [''],
      Mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      PreviousPolicyExpiryDate: [this.datePipe.transform(new Date(), 'yyyy-MM-dd')],
      RegistrationDate: [''],
      ManufacturingDate: [''],
      VehicleType: [this.vehicleType],
      CoverType: [this.coverType],
      Product: ['0'],
      ModelId: [''],
      VehicleCode: [''],
      CubicCapacity: [''],
      IsClaimMade: [],
      NCBDiscount: [''],
      Email: ['', [Validators.required, Validators.email]],
      CustName: ['', Validators.required],
      RegistrationNumber: [''],
      OwnedBy: ['1'],
      searchTextManufacture: [''],
      searchTextModel: [''],
      rtoSearchText: ['']
    })
    this.getManufactureList();
    this.getRTOList();
  }

  getManufactureList() {
    this.searchService.getManufacturer().subscribe(res => {
      this.manufacturerList = res;
    })
  }

  getVehicleList(manufacturerId: number) {
    this.searchService.getVehicles().subscribe(res => {
      this.vehicleList = res.filter(f => parseInt(f.ManufacturerID) == manufacturerId);
    })
  }

  getVariantList(vehicleId: number) {
    this.searchService.getVariants().subscribe(res => {
      this.variantList = res.filter(f => parseInt(f.VehicleID) == vehicleId);
    })
  }
  getRTOList() {
    this.searchService.getRTOs().subscribe(res => {
      this.rtoList = res;
    })
  }
  filterRTOList() {
    this.isShowAutoComplete = true;
    this.rtoFilterList = this.rtoList.filter(f => f.FullRtoCode.toLowerCase().includes(this.searchForm.value.rtoSearchText.toLowerCase()) || f.RTOName.toLowerCase().includes(this.searchForm.value.rtoSearchText.toLowerCase()));
  }
  updateRTO(rto: RTO) {
    this.searchForm.patchValue({
      rtoSearchText: rto.FullRtoCode + ' ' + rto.RTOName,
      RegistrationRTOCode: rto.RTOID
    });
    this.searchService.searchObject.rto = rto;
    this.isShowAutoComplete = false;
  }
  goNext(page: number, event?: any, data?: any) {
    this.resetPage();
    switch (page) {
      case 1:
        this.isShowManufacture = true;
      case 2:
        this.isShowModel = true;
        this.searchService.searchObject.manufacturer = (data as Manufacturer);
        //if (event.target.checked)
        this.getVehicleList(this.searchForm.value.MakeID);
        break;
      case 3:
        this.isShowFuelType = true;
        this.searchService.searchObject.model = (data as Vehicle);
        break;
      case 4:
        this.isShowVariant = true;
        this.searchService.searchObject.fuelType = data;
        // if (event.target.checked)
        this.getVariantList(this.searchForm.value.ModelId);
        break;
      case 5:
        this.isShowRegistrationYear = true;
        this.searchService.searchObject.variant = (data as Variant);
        this.searchForm.patchValue({
          CubicCapacity: data.VehicleCC,
          VehicleCode: data.MasterVehicleCode
        });
        break;
      case 6:
        this.isShowRto = true;
        // if (event.target.checked) {
        if (event.target.value == 'new')
          event.target.value = new Date().getFullYear();
        this.searchService.searchObject.manufacturerYear = event.target.value;
        this.searchForm.patchValue({
          RegistrationDate: this.datePipe.transform(new Date('01-01-' + event.target.value), 'yyyy-MM-dd'),
          ManufacturingDate: this.datePipe.transform(new Date('01-01-' + event.target.value), 'yyyy-MM-dd')
        });
        //}
        break;
      case 7:
        this.isShowDetails = true;
        break;
    }
  }

  resetPage() {
    this.isShowManufacture = false;
    this.isShowModel = false;
    this.isShowFuelType = false;
    this.isShowVariant = false;
    this.isShowRegistrationYear = false;
    this.isShowRto = false;
    this.isShowDetails = false;
  }
  searchMotor() {
    this.searchService.searchObject.mobile = this.searchForm.value.Mobile;
    this.searchService.searchObject.email = this.searchForm.value.Email;
    if (this.searchForm.valid) {
      let request: InsertQuoteRequest = {
        CoverType: this.searchForm.value.CoverType,
        CubicCapacity: this.searchForm.value.CubicCapacity,
        CustName: this.searchForm.value.CustName,
        Email: this.searchForm.value.Email,
        FuelID: this.searchForm.value.FuelID,
        IsClaimMade: this.searchForm.value.IsClaimMade,
        MakeID: this.searchForm.value.MakeID,
        ManufacturingDate: this.searchForm.value.ManufacturingDate,
        Mobile: this.searchForm.value.Mobile,
        ModelId: this.searchForm.value.ModelId,
        NCBDiscount: this.searchForm.value.NCBDiscount,
        OwnedBy: this.searchForm.value.OwnedBy,
        PreviousPolicyExpiryDate: this.datePipe.transform(new Date(this.searchForm.value.PreviousPolicyExpiryDate), 'yyyy/MM/dd'),
        Product: this.searchForm.value.Product,
        RegistrationDate: this.datePipe.transform(new Date(this.searchForm.value.RegistrationDate), 'yyyy-MM-dd'),
        RegistrationNumber: this.searchForm.value.RegistrationNumber,
        RegistrationRTOCode: this.searchForm.value.RegistrationRTOCode,
        TypeOfPolicy: this.searchForm.value.TypeOfPolicy,
        VariantID: this.searchForm.value.VariantID,
        VehicleCode: this.searchForm.value.VehicleCode,
        VehicleType: this.searchForm.value.VehicleType
      }
      this.motorService.searchMotorInsurance(request).subscribe(res => {
        sessionStorage.setItem('searchObject', JSON.stringify(this.searchService.searchObject))
        sessionStorage.setItem('searchRequest', JSON.stringify(request))
        if (res) {
          this.router.navigate(['/motor-insurance'], { queryParams: { enquiryId: res } });
        }
      })
    }
  }
}
