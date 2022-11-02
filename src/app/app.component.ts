import { Component } from '@angular/core';
import { dinner } from 'src/models/dinner';
import { recipe } from 'src/models/recipe';
import recipes from 'src/app/recipes.json';
import { ingredient } from 'src/models/ingredient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eat-me-client';
  recipes: dinner[] = [];
  selectedRecipes: dinner[] = [];
  checkbox:boolean = false;

  ngOnInit(){
    this.getAllIngredients();
    this.recipes = [
      {name:"Strogonoff",day:""},
      {name:"Burgers",day:""},
      {name:"Soup & Salad",day:""},
      {name:"Chicken & Rice",day:""},
      {name:"Carnitas",day:""},
      {name:"Salmon & Rice",day:""},
      {name:"Chicken Ramen",day:""},
      {name:"Bacon Wrapped Chicken",day:""},
      {name:"Spaghetti",day:""},
      {name:"Steaks",day:""},
      {name:"Silly Supper",day:""},
      {name:"Chicken/Andouille Cajun Pasta",day:""},
      {name:"Creamy Chicken Pesto Pasta",day:""},
      {name:"Salmon Alfredo Pasta",day:""},
      {name:"Takeout",day:""},
      {name:"Chicken Schwarma",day:""},
      {name:"Red Pepper Goat Cheese Chicken",day:""},
      {name:"Homemade Chicken Fingers",day:""},
      {name:"BBQ Brats",day:""},
      {name:"Dirty Rice",day:""},
      {name:"Phillies",day:""},
      {name:"Chicken Scampi",day:""}

    ]
    this.chooseSevenRecipes()
  }
  getAllIngredients(){
    let ingredients:ingredient[] = [];
    recipes.forEach(element => {
      element.ingredients.forEach(innerElement => {
        ingredients.push(innerElement);
      });
    });
    console.log("Look at all these inredients");
    console.log(ingredients)
  }
  testMethod(pRecipeName:string){
    console.log(pRecipeName)
    let recipe = this.selectedRecipes.find(r => r.name == pRecipeName)
    let index = 0;
    if (recipe != undefined){
      index = this.selectedRecipes.indexOf(recipe);
    }
    let newRecipe = this.getReplacementRecipe();
    this.selectedRecipes[index].name = newRecipe.name;
  }
  chooseSevenRecipes(){
    let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    let usedIndices:number[] = [];
    for(var i = 0; i < 7; i++){
      let randomIndex = -1;
      while(randomIndex == -1){ //ensure recipes are not chosen twice
        let num = this.getRandomInt(0, this.recipes.length - 1);
        if (!usedIndices.includes(num)){
          randomIndex = num;
          usedIndices.push(randomIndex);
        }
      }     
      this.selectedRecipes.push(this.recipes[usedIndices[i]]);
      this.selectedRecipes[i].day = days[i];
    }
  }
  getReplacementRecipe():dinner{
    let randomIndex = -1;
    while(randomIndex == -1){
      let num = this.getRandomInt(0, this.recipes.length - 1);
      let proposedRecipe = this.recipes[num].name;
      let recipe = this.selectedRecipes.find(r => r.name == proposedRecipe);
      if (recipe == undefined){
        randomIndex = num;
      }
    }
    let newRecipe = this.recipes[randomIndex];
    return newRecipe;
  }
  getRandomInt(pMin:number, pMax:number){
    pMin = Math.ceil(pMin);
    pMax = Math.floor(pMax);
    return Math.floor(Math.random() * (pMax - pMin + 1)) + pMin;
  }
}
