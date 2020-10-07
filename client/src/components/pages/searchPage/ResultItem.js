import React from 'react';
import history from '../../../history';

const ResultItem = ({ recipe }) => {
  const { images, recipeName, ownerData, _id } = recipe;

  return (

    <div className="pointer" onClick={() => history.push(`/recipe/${_id}`)}>
      <div
        className="uk-card">
        <div className="uk-card-media-top uk-inline uk-light">
          {/* <img className="uk-border-rounded-medium" src="https://via.placeholder.com/300x160" alt="Course Title" /> */}
          <img className="uk-border-rounded-medium" src={images[0]} alt="Course Title" style={{ width: '100%', height: '150px' }} />
          <div className="uk-position-cover uk-card-overlay uk-border-rounded-medium"></div>
          <div className="uk-position-xsmall uk-position-top-right">
            <a href="#" className="uk-icon-button uk-like uk-position-z-index uk-position-relative"
              data-uk-icon="heart"></a>
          </div>
        </div>
        <div>
          <h3 className="uk-card-title uk-text-500 uk-margin-small-bottom uk-margin-top">{recipeName}</h3>
          <div className="uk-text-xsmall uk-text-muted" data-uk-grid>
            <div className="uk-width-auto uk-flex uk-flex-middle">
              <span className="uk-rating-filled" data-uk-icon="icon: star; ratio: 0.7"></span>
              <span className="uk-margin-xsmall-left">5.0</span>
              <span>(73)</span>
            </div>
            <div className="uk-width-expand uk-text-right">by {ownerData.name}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultItem
