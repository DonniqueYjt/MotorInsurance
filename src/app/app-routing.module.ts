import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
  { path: 'motor-insurance', loadChildren: () => import('./motor-insurance/motor-insurance.module').then(m => m.MotorInsuranceModule) },
  { path: 'summary', loadChildren: () => import('./summary/summary.module').then(m => m.SummaryModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
