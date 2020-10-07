import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Api from '../../../apis/Api';
import history from '../../../history';

const RecipeItem = ({ recipe, getUserRecipies }) => {
  //redux store state
  const accessToken = useSelector(state => state.accessToken);

  const { images, recipeName, ownerData, _id } = recipe;

  const onEditClick = (e) => {
    e.stopPropagation();
    history.push(`/submit?id=${recipe._id}`)
  }

  const onDeleteClick = async (e) => {
    e.stopPropagation();
    const response = await Api.delete(`/recipes/${recipe._id}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    getUserRecipies();
  }

  const onApproveClick = async (e) => {
    e.stopPropagation();
    let approval = '';
    if (recipe.approved === 'pending' || recipe.approved === 'rejected') approval = 'approved';
    else approval = 'rejected';
    const response = await Api.post('/recipes/approval', { approval, id: recipe._id }, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })

    getUserRecipies();
  }

  return (
    <div onClick={() => history.push(`/recipe/${recipe._id}`)}>
      <div className="uk-card">
        <div className="uk-card-media-top uk-inline uk-light">
          <img className="uk-border-rounded-medium" src={images[0]} alt="Course Title" style={{ width: '100%', height: '150px' }} />

          <div className="uk-position-cover uk-card-overlay uk-border-rounded-medium"></div>

          {(history.location.pathname === '/profile' || history.location.pathname === '/dashboard') && <div className="uk-position-xsmall uk-position-top-right">
            <i className="uk-icon-button uk-like uk-position-z-index uk-position-relative" data-uk-icon="close" onClick={onDeleteClick}></i>
            <i className="uk-icon-button uk-like uk-position-z-index uk-position-relative" data-uk-icon="pencil" onClick={onEditClick}></i>
          </div>}

          {history.location.pathname === '/dashboard' && <div className="uk-position-xsmall uk-position-top-left">
            <i className="uk-icon-button uk-like uk-position-z-index uk-position-relative">
              <Button className="text-sm ml-5 p-1" variant={recipe.approved === 'pending' || recipe.approved === 'rejected' ? 'success' : 'danger'} size="small" onClick={onApproveClick}>{recipe.approved === 'pending' || recipe.approved === 'rejected' ? 'Approve' : 'Reject'}</Button>
            </i>
          </div>}

          {history.location.pathname === '/dashboard' && <div className="uk-position-xsmall uk-position-bottom-right">
            <span>{recipe.approved}</span>
          </div>}

        </div>
        <div>
          <h3 className="uk-card-title uk-text-500 uk-margin-top mb-0">{recipeName}</h3>

          <div className="uk-text-xsmall uk-text-muted" data-uk-grid>
            <div className="uk-width-auto uk-flex uk-flex-middle">
              <span className="uk-rating-filled" data-uk-icon="icon: star; ratio: 0.7"></span>
              <span className="uk-margin-xsmall-left">5.0</span>
              <span>(73)</span>
            </div>
            <div className="uk-width-expand uk-text-right">by {ownerData.name}</div>
          </div>
          <div className="d-flex justify-content-between">
            <span className="m-0 p-0 text-xs text-light-grey-md">Difficulty: {getDifficulty(recipe.difficulty)}</span>
            <span className="m-0 p-0 text-xs text-light-grey-md">Strength: {getStrength(recipe.strength)}</span>
          </div>

        </div>
      </div>

    </div>
  )
}

const getDifficulty = (number) => {
  if (number === 1) return 'Easy';
  if (number === 2) return 'Medium';
  if (number === 3) return 'Hard';
}

const getStrength = (number) => {
  if (number === 1) return 'Non-Alcoholic';
  if (number === 2) return 'Weak';
  if (number === 3) return 'Medium';
  if (number === 4) return 'Strong';
}

export default RecipeItem
