import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordTableComponent } from './password-table.component';

describe('PasswordTableComponent', () => {
  let component: PasswordTableComponent;
  let fixture: ComponentFixture<PasswordTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
