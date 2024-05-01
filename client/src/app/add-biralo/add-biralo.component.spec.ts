import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBiraloComponent } from './add-biralo.component';

describe('AddBiraloComponent', () => {
  let component: AddBiraloComponent;
  let fixture: ComponentFixture<AddBiraloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBiraloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBiraloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
