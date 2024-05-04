import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAcceptedComponent } from './view-accepted.component';

describe('ViewAcceptedComponent', () => {
  let component: ViewAcceptedComponent;
  let fixture: ComponentFixture<ViewAcceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAcceptedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
