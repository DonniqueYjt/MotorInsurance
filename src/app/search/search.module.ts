import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchStep1Component } from './search-step1/search-step1.component';
import { SearchStep2Component } from './search-step2/search-step2.component';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';


@NgModule({
  declarations: [SearchStep1Component, SearchStep2Component, SearchComponent, SearchFilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
