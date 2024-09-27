import { Injectable } from "@angular/core";
import { IngredientTypes } from "../enums/ingredientTypes";
import { RecipeTypes } from "../enums/recipeTypes";

@Injectable({ providedIn: 'root' })
export class RecipeService {
    public recipes: { [index: string]: { [index: string]: number } } = {};
    public recipeFeeds: { [index: string]: number } = {};
    public ingredientKeys = new Array<string>();
    public recipeKeys = new Array<string>();
    public results: { [index: string]: number } = {};
    public totalAmount = 0;

    constructor() {
        this.ingredientKeys = Object.keys(IngredientTypes);
        this.recipeKeys = Object.keys(RecipeTypes);

        this.recipes[RecipeTypes.Burger] = {};
        this.recipes[RecipeTypes.Burger][IngredientTypes.Meat] = 1;
        this.recipes[RecipeTypes.Burger][IngredientTypes.Lettuce] = 1;
        this.recipes[RecipeTypes.Burger][IngredientTypes.Tomato] = 1;
        this.recipes[RecipeTypes.Burger][IngredientTypes.Cheese] = 1;
        this.recipes[RecipeTypes.Burger][IngredientTypes.Dough] = 1;
        this.recipeFeeds[RecipeTypes.Burger] = 1;

        this.recipes[RecipeTypes.Pie] = {};
        this.recipes[RecipeTypes.Pie][IngredientTypes.Meat] = 2;
        this.recipes[RecipeTypes.Pie][IngredientTypes.Dough] = 2;
        this.recipeFeeds[RecipeTypes.Pie] = 1;

        this.recipes[RecipeTypes.Sandwich] = {};
        this.recipes[RecipeTypes.Sandwich][IngredientTypes.Cucumber] = 1;
        this.recipes[RecipeTypes.Sandwich][IngredientTypes.Dough] = 1;
        this.recipeFeeds[RecipeTypes.Sandwich] = 1;

        this.recipes[RecipeTypes.Pasta] = {};
        this.recipes[RecipeTypes.Pasta][IngredientTypes.Meat] = 1;
        this.recipes[RecipeTypes.Pasta][IngredientTypes.Tomato] = 1;
        this.recipes[RecipeTypes.Pasta][IngredientTypes.Cheese] = 2;
        this.recipes[RecipeTypes.Pasta][IngredientTypes.Dough] = 2;
        this.recipeFeeds[RecipeTypes.Pasta] = 2;

        this.recipes[RecipeTypes.Salad] = {};
        this.recipes[RecipeTypes.Salad][IngredientTypes.Cucumber] = 1;
        this.recipes[RecipeTypes.Salad][IngredientTypes.Lettuce] = 2;
        this.recipes[RecipeTypes.Salad][IngredientTypes.Tomato] = 2;
        this.recipes[RecipeTypes.Salad][IngredientTypes.Cheese] = 2;
        this.recipes[RecipeTypes.Salad][IngredientTypes.Olives] = 1;
        this.recipeFeeds[RecipeTypes.Salad] = 3;

        this.recipes[RecipeTypes.Pizza] = {};
        this.recipes[RecipeTypes.Pizza][IngredientTypes.Olives] = 1;
        this.recipes[RecipeTypes.Pizza][IngredientTypes.Tomato] = 2;
        this.recipes[RecipeTypes.Pizza][IngredientTypes.Cheese] = 3;
        this.recipes[RecipeTypes.Pizza][IngredientTypes.Dough] = 3;
        this.recipeFeeds[RecipeTypes.Pizza] = 4;
    }

    calculateResult(capturedAmounts: any): void {
        this.results = {};
        this.totalAmount = 0;
        this.doCalculation(capturedAmounts);
        let prevResult = this.getPreviousResults();
        let currentResult:any = {};
        let nowString = Date.now().toString();
        currentResult[nowString] = this.totalAmount;
        prevResult = {...prevResult,...currentResult};
        localStorage.setItem('feedingResults', JSON.stringify(prevResult));
        return;
    }

    public getPreviousResults(): any {
        let prevResultsString = localStorage.getItem('feedingResults');
        if(!prevResultsString)
        {
            prevResultsString = '{}';
        }
        let prevResult = JSON.parse(prevResultsString);
        return prevResult;
    }

    private doCalculation(capturedAmounts: any): void {
        let tempAmount = 0;
        for (let recipeIndex = 0; recipeIndex < this.recipeKeys.length; recipeIndex++) {
            const recipy = this.recipeKeys[recipeIndex];
            for (let ingredientIndex = 0; ingredientIndex < this.ingredientKeys.length; ingredientIndex++) {
                const ingredient = this.ingredientKeys[ingredientIndex];
                const ingredientAmountAvailable = capturedAmounts[ingredient];
                let ingredientAmountRequired = this.recipes[recipy][ingredient];
                if (ingredientAmountRequired && ingredientAmountRequired > ingredientAmountAvailable) {
                    break;
                }
                if (ingredientIndex == this.ingredientKeys.length - 1) {
                    if (!this.results[recipy]) {
                        this.results[recipy] = 0;
                    }
                    this.results[recipy]++;
                    tempAmount += this.recipeFeeds[recipy];
                    let ingredientsToRemoveKeys = Object.keys(this.recipes[recipy]);
                    ingredientsToRemoveKeys.forEach(ingredientToRemove => {
                        capturedAmounts[ingredientToRemove] -= this.recipes[recipy][ingredientToRemove];
                    });
                }
            }
        }
        this.totalAmount += tempAmount;
        if (tempAmount != 0) {
            this.doCalculation(capturedAmounts);
        }
        return;
    }
}