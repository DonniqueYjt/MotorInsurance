import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStep1Component } from './search-step1.component';

describe('SearchStep1Component', () => {
  let component: SearchStep1Component;
  let fixture: ComponentFixture<SearchStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
