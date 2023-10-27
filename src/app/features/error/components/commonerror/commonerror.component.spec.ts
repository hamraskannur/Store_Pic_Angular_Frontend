import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonerrorComponent } from './commonerror.component';

describe('CommonerrorComponent', () => {
  let component: CommonerrorComponent;
  let fixture: ComponentFixture<CommonerrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonerrorComponent]
    });
    fixture = TestBed.createComponent(CommonerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
