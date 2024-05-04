import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPublicationListComponent } from './view-publication-list.component';

describe('ViewPublicationListComponent', () => {
  let component: ViewPublicationListComponent;
  let fixture: ComponentFixture<ViewPublicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPublicationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPublicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
