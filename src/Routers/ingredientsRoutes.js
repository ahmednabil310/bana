const express = require('express');
const router = new express.Router();
//Auth middleware
const memberAuth = require('../middleware/memberAuth');
const adminAuth = require('../middleware/adminAuth');
//models
const ingredientsModel = require('../Models/ingredientsModel');
const Recipe = require('../Models/recipeModel');

router.get('/ingredients', async (req, res) => {
  // const ingredients = await ingredientsModel.find({}).sort({ name: 1 });
  const ingredients = await ingredientsModel.aggregate([
    { $sort: { name: 1 } },
    {
      $group: {
        _id: '$category',
        items: { $push: "$$ROOT" }
      }
    },
    { $sort: { _id: 1 } }
  ])

  res.send(ingredients);
})

//route to add or edit ingredients
router.post('/ingredients/update', adminAuth, async (req, res) => {
  const { name, category, id } = req.body

  try {
    //check if the request is for editing an ingredient
    if (id) {
      const updatedIngredient = await ingredientsModel.findOneAndUpdate({ _id: id }, { $set: { name, category } }, { new: true, useFindAndModify: false }, () => { });
      return res.send(updatedIngredient);
    }

    const ingredient = new ingredientsModel({ name, category });
    await ingredient.save();
    res.send(ingredient);

  } catch (error) {
    res.send({ error: error.message });
  }
})

//route to delete ingredient
router.delete('/ingredients', adminAuth, async (req, res) => {
  const { id } = req.body;

  try {
    //1. delete the ingredient from the recipes
    const deletedDocs = await Recipe.updateMany({ 'ingredients.ingredientId': id }, { $pull: { ingredients: { ingredientId: id } } });

    //2.delete the ingredient from the database
    const deletedIngredient = await ingredientsModel.deleteOne({ _id: id })

    //3.delete any recipe that does not have ingredients
    //doing this step as there might be recipes that have only the ingredient that was deleted ending up with a recipe with no ingredient, which break in the recipe page
    const deletedRecipesWithNoIngredients = await Recipe.deleteMany({ ingredients: { $size: 0 } });
    res.send({ deletedDocs, deletedIngredient, deletedRecipesWithNoIngredients });

  } catch (error) {
    res.send({ error: error.message })
  }
})


module.exports = router;