import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPublicationComponent } from './select-publication.component';

describe('SelectPublicationComponent', () => {
  let component: SelectPublicationComponent;
  let fixture: ComponentFixture<SelectPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectPublicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
