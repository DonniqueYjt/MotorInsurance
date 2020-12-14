import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorInsuranceComponent } from './motor-insurance.component';
import { MotorInsuranceRoutingModule } from './motor-insurance-routing.module';



@NgModule({
  declarations: [MotorInsuranceComponent],
  imports: [
    CommonModule,
    MotorInsuranceRoutingModule
  ]
})
export class MotorInsuranceModule { }
