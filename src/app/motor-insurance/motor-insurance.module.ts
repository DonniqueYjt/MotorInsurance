import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorInsuranceComponent } from './motor-insurance.component';
import { MotorInsuranceRoutingModule } from './motor-insurance-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MotorInsuranceComponent],
  imports: [
    CommonModule,
    FormsModule,
    MotorInsuranceRoutingModule
  ]
})
export class MotorInsuranceModule { }
