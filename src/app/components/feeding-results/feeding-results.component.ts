import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../shared';
import { MatTableModule } from '@angular/material/table';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-feeding-results',
  standalone: true,
  imports: [
    MatTableModule,
    KeyValuePipe 
  ],
  templateUrl: './feeding-results.component.html',
  styleUrl: './feeding-results.component.scss'
})
export class FeedingResultsComponent {

  constructor(public recipeService: RecipeService) {
  }
}
