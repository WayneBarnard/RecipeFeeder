import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CaptureIngredientsComponent, FeedingResultsComponent, PreviousResultsComponent } from '../components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    CaptureIngredientsComponent,
    FeedingResultsComponent,
    PreviousResultsComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  public selectedTabIndex = 0;

  public captureDone($event: boolean): void {
    if ($event) {
      this.selectedTabIndex = 1;
    }
  }

  public onTabChanged(index: number): void {
    this.selectedTabIndex = index;
  }
}
