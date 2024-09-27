import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../shared';
import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-previous-results',
  standalone: true,
  imports: [
    CommonModule,
    KeyValuePipe
  ],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: "longDate" }
    }
  ],
  templateUrl: './prev-results.component.html',
  styleUrl: './prev-results.component.scss'
})
export class PreviousResultsComponent implements OnInit {
  public prevResults: { [index: number]: number } = {};

  constructor(private _recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.prevResults = this._recipeService.getPreviousResults();
  }
}
