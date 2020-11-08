import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumodalComponent } from './sumodal.component';

describe('SumodalComponent', () => {
  let component: SumodalComponent;
  let fixture: ComponentFixture<SumodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
