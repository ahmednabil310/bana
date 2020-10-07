import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Api from '../../../apis/Api';
//imported comp
import RecipeItem from '../findRecipesPage/RecipeItem';

const SimilarRecipes = ({ recipe }) => {
  //redux store state
  const accessToken = useSelector(state => state.accessToken);
  //comp local state
  const [recipes, setRecipes] = useState([]);

  const getSimilarRecipes = async () => {
    const names = recipe.ingredients.map(el => el.ingredientData.name)
    const response = await Api.post('/recipes/similar', { filters: { ingredients: names }, page: 1 }, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })

    setRecipes(response.data[0].paginatedResults)
  }

  useEffect(() => {
    getSimilarRecipes();
  }, [])

  return (
    <div className="uk-section uk-section-muted">
      <div className="uk-container">
        <h3>Other Recipes You May Like</h3>
        <div className="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-margin-medium-top" data-uk-grid>
          {recipes.map(el => {
            if (el._id !== recipe._id) return <RecipeItem key={el._id} recipe={el} />
          })}
        </div>
      </div>
    </div>
  )
}

export default SimilarRecipes
