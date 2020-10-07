import React from 'react';

const StepsTagsShare = ({ steps }) => {
  return (
    <div className="uk-width-1-3@m">

      {/* --------------- Steps Section ----------------- */}
      {steps && steps.length > 0 && <div>
        <h3>How to Make It</h3>
        <ul className="uk-list uk-list-large uk-list-divider uk-margin-medium-top">
          {steps.map((step, index) => {
            return (
              <li key={index}>
                <p className="text-highliten m-0 p-0">Step: {index + 1}</p>
                <p className="m-0 p-0">{step}</p>
              </li>
            )
          })}
        </ul>
      </div>}

      {/* --------------- Tags Section ----------------- */}
      <h3 className="uk-margin-large-top">Tags</h3>
      <div className="uk-margin-medium-top" data-uk-margin>
        <a className="uk-display-inline-block" href="/"><span className="uk-label uk-label-light">dinner</span></a>
        <a className="uk-display-inline-block" href="/"><span className="uk-label uk-label-light">casserole</span></a>
        <a className="uk-display-inline-block" href="/"><span className="uk-label uk-label-light">party</span></a>
        <a className="uk-display-inline-block" href="/"><span className="uk-label uk-label-light">meat</span></a>
      </div>

      {/* --------------- Share Section ----------------- */}
      <h3 className="uk-margin-large-top">Share Recipe</h3>
      <div className="uk-margin-medium-top">
        <div data-uk-grid className="uk-child-width-auto uk-grid-small">
          <div>
            <i data-uk-icon="icon: facebook; ratio: 0.9" className="uk-icon-button facebook" target="_blank"></i>
          </div>
          <div>
            <i data-uk-icon="icon: linkedin; ratio: 0.9" className="uk-icon-button linkedin" target="_blank"></i>
          </div>
          <div>
            <i data-uk-icon="icon: twitter; ratio: 0.9" className="uk-icon-button twitter" target="_blank"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepsTagsShare
