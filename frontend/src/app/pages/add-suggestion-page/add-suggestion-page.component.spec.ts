import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuggestionPageComponent } from './add-suggestion-page.component';

describe('AddSuggestionPageComponent', () => {
  let component: AddSuggestionPageComponent;
  let fixture: ComponentFixture<AddSuggestionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSuggestionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSuggestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
