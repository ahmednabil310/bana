import React from 'react';
//imported comps
import RecipeItem from './RecipeItem';

const RecipesItems = ({ recipes, getUserRecipies }) => {
  return (
    <div className="uk-child-width-1-2 uk-child-width-1-3@s" data-uk-grid>
      {recipes && recipes.map(recipe => <RecipeItem key={recipe._id} recipe={recipe} getUserRecipies={getUserRecipies} />)}
    </div>
  )
}

export default RecipesItems
