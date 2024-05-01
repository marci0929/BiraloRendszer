import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPublicationComponent } from './review-publication.component';

describe('ReviewPublicationComponent', () => {
  let component: ReviewPublicationComponent;
  let fixture: ComponentFixture<ReviewPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewPublicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
