import React from 'react';
import { Button } from 'react-bootstrap';
import history from '../../../history';


const Confirm = () => {
  return (
    <div className="uk-section uk-section-default uk-padding-remove-top">
      <div className="uk-container">

        <div className="text-center">
          <div className="col card-custom py-3">
            <h5 className="my-4 px-4">Your account has been created successfully. You will be notifed when your account is approved.</h5>
          </div>
          <button className="uk-button uk-button-primary uk-button-large" onClick={() => history.push('/')}>Home</button>

        </div>

      </div>
    </div >
  )
}

export default Confirm
