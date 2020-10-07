const express = require('express');
const router = new express.Router();
const calculations = require('../configs/calculations')
//Auth middleware
const memberAuth = require('../middleware/memberAuth');
const adminAuth = require('../middleware/adminAuth');
const recipeOwnerOrAdmin = require('../middleware/recipeOwnerOrAdmin');
//imported models
const Recipe = require('../Models/recipeModel');

const ingredientsModel = require('../Models/ingredientsModel');

router.get('/ingredients/data', async (req, res) => {
  const ingredients = await ingredientsModel.find({}).sort({ name: 1 });
  res.send(ingredients);
})

router.post('/uploadrecipe', memberAuth, async (req, res) => {
  const { recipe } = req.body;
  const ingredients = calculations(recipe.ingredients, recipe.numberOfServings);
  try {
    const recipeRecord = { ...recipe, ingredients: ingredients.ingredientsArray, totalMoleAmount: ingredients.totalAmount }

    if (recipe._id) {
      //here means we want to update a recipe
      const id = recipe._id;
      delete recipe._id;
      recipe.approved = false;

      const updatedRecipe = await Recipe.findOneAndUpdate({ _id: id }, { $set: recipeRecord }, { new: true, useFindAndModify: false }, () => { });
      res.send(updatedRecipe);
    } else {
      //here means we want to add a new recipe
      const newRecipe = new Recipe(recipeRecord);
      await newRecipe.save()
      res.send(newRecipe);
    }

  } catch (error) {
    console.log({ error: error.message })
    res.send({ error: error.message })
  }
})

router.post('/getrecipes', async (req, res) => {
  const { filters, exact, page, approvalArray } = req.body;
  try {
    const recipes = await Recipe.getRecipes(filters, exact, page, approvalArray);
    res.send(recipes)
  } catch (error) {
    res.send({ error: error.message })
  }
})

router.get('/recipe/data', async (req, res) => {
  const { id } = req.query;

  try {
    const recipe = await Recipe.getRecipeWithDetails(id);
    res.send(recipe)
  } catch (error) {
    res.send({ error: error.message })
  }
})

//get a recipe to edit in the submit page
router.get('/recipe', async (req, res) => {
  const { id } = req.query;

  try {
    const recipe = await Recipe.findById(id);
    res.send(recipe)
  } catch (error) {
    res.send({ error: error.message })
  }
})

//route to get recipes count for a user
router.get('/recipecount', memberAuth, async (req, res) => {
  try {
    const count = await Recipe.countDocuments({ owner: req.user._id });
    res.send({ count })
  } catch (error) {
    res.send({ error: error.message })
  }

})

router.delete('/recipes/:id', recipeOwnerOrAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await Recipe.deleteOne({ _id: id })
    res.send('deleted');
  } catch (error) {
    res.send({ error: error.message })
  }
})

//route to get similar recipes
router.post('/recipes/similar', async (req, res) => {
  const { filters, page } = req.body;

  try {
    const recipes = await Recipe.getRecipes(filters, false, page);
    res.send(recipes)
  } catch (error) {
    res.send({ error: error.message })
  }
})

//route to approve/reject a recipe
router.post('/recipes/approval', adminAuth, async (req, res) => {
  const { approval, id } = req.body;

  try {
    const updatedRecipe = await Recipe.findOneAndUpdate({ _id: id }, { $set: { approved: approval } }, { new: true, useFindAndModify: false }, () => { });
    res.send(updatedRecipe);
  } catch (error) {
    res.send({ error: error.message })
  }
})

module.exports = router;