import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserAdComponent } from './add-user-ad.component';

describe('AddUserAdComponent', () => {
  let component: AddUserAdComponent;
  let fixture: ComponentFixture<AddUserAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
