import { TestBed } from '@angular/core/testing';
import { FeedingResultsComponent } from './feeding-results.component';

describe('FeedingResultsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedingResultsComponent],
    }).compileComponents();
  });

  it('should create Feeding Results', () => {
    const fixture = TestBed.createComponent(FeedingResultsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
