import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { NomineeDetailsComponent } from './nominee-details/nominee-details.component';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';
import { ProposalDetailsComponent } from './proposal-details/proposal-details.component';
import { SummaryComponent } from './summary.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';

const routes: Routes = [
  {
    path: '', component: SummaryComponent, redirectTo: '/summary/owner',
    children: [
      { path: 'owner', component: OwnerDetailsComponent },
      { path: 'address', component: AddressDetailsComponent },
      { path: 'nominee', component: NomineeDetailsComponent },
      { path: 'vehicle', component: VehicleDetailsComponent },
      { path: 'proposal', component: ProposalDetailsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummaryRoutingModule { }
