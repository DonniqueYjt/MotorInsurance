import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { NomineeDetailsComponent } from './nominee-details/nominee-details.component';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';
import { ProposalDetailsComponent } from './proposal-details/proposal-details.component';
import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';

@NgModule({
  declarations: [SummaryComponent, VehicleDetailsComponent, OwnerDetailsComponent, NomineeDetailsComponent, ProposalDetailsComponent, AddressDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SummaryRoutingModule
  ]
})
export class SummaryModule { }
