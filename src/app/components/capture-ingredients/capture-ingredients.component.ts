import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngredientTypes, RecipeService } from '../../shared';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-capture-ingredients',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './capture-ingredients.component.html',
  styleUrl: './capture-ingredients.component.scss'
})
export class CaptureIngredientsComponent implements OnInit {
  public captureIngredientsForm: FormGroup;
  public ingredientKeys = new Array<string>();

  @Output() captureDone: EventEmitter<boolean> =
  new EventEmitter<boolean>();

  constructor(private _fb: FormBuilder, private _recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.ingredientKeys = this._recipeService.ingredientKeys;
    let fbGroup: any = {};
    for (let index = 0; index < this.ingredientKeys.length; index++) {
      const ingredient = this.ingredientKeys[index];
      fbGroup[ingredient] = ['', Validators.required];
    }
    this.captureIngredientsForm = this._fb.group(fbGroup);
  }

  saveIngredients(): void {
    const values = this.captureIngredientsForm.value;
    this._recipeService.calculateResult(values);
    this.captureDone.emit(true);
  }
}
