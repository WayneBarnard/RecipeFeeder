import { TestBed } from '@angular/core/testing';
import { CaptureIngredientsComponent } from './capture-ingredients.component';

describe('CaptureIngredientsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptureIngredientsComponent],
    }).compileComponents();
  });

  it('should create Capture Ingredients', () => {
    const fixture = TestBed.createComponent(CaptureIngredientsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
