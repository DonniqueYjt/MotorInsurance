import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';
import { SearchStep1Component } from './search-step1/search-step1.component';
import { SearchStep2Component } from './search-step2/search-step2.component';

const routes: Routes = [
  {
    path: '', component: SearchComponent, children: [
      { path: '', redirectTo: 'step1' },
      { path: 'step1', component: SearchStep1Component },
      { path: 'step2', component: SearchStep2Component }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
