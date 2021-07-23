
import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode = false;

  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService :RecipeService,
              private router: Router ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id =+params['id'];
        this.editMode  = params['id'] != null;

        //should call this function when route paramters have changed,
        //that indicates that we have reloaded the form
        this.initForm();
      }
    )
  }

  private initForm(){

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDesc = recipe.description;

      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name, Validators.required),
              'amount' : new FormControl(ingredient.amount,[
                              Validators.required,
                              Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    //takes key value pairs of the controls we want to register
    this.recipeForm = new FormGroup({

      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'description' : new FormControl(recipeDesc, Validators.required),
      'ingredients' : recipeIngredients

    });


  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  //saving recipe into array of recipe's or updating an existing one
  onSubmit(){

    // const newRecipe = new Recipe(
    //                       this.recipeForm.value['name'],
    //                       this.recipeForm.value['description'],
    //                       this.recipeForm.value['imagePath'],
    //                       this.recipeForm.value['ingredients']
    //                      );

    // the above can be abbreivated into -> this.recipe.Form.value


    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount' : new FormControl(null, [
                      Validators.required,
                      Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
