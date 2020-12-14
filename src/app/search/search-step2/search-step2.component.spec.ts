import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStep2Component } from './search-step2.component';

describe('SearchStep2Component', () => {
  let component: SearchStep2Component;
  let fixture: ComponentFixture<SearchStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
