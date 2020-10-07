import React, { useState } from 'react';
import { Form, Button, Col, Spinner } from 'react-bootstrap';
import { statesOptions } from '../../../configs/dropdownOptions';

const AddSteps = ({ steps, setSteps }) => {
  const [stepValue, setStepValue] = useState('')

  const onAddClick = () => {
    if (stepValue) {
      setSteps([...steps, stepValue]);
      setStepValue('')
    }
  }

  return (
    <div className="mt-5">
      <h3 className="text-dark-grey mb-0">How to make</h3>
      <p className="text-light mt-0 mb-2">Add the needed steps to make this recipe.</p>

      <ul className="uk-list uk-list-large uk-list-divider uk-margin-medium-top">
        {steps.map((step, index) => {
          return (
            <li key={index}>
              <div className="d-flex justify-content-between">
                <p className="text-highliten m-0 p-0">Step: {index + 1}</p>
                <span className="material-icons pointer" onClick={() => setSteps(steps.filter(el => el !== step))}>delete</span>
              </div>
              <p className="m-0 p-0">{step}</p>
            </li>
          )
        })}
      </ul>

      <div className="d-flex align-items-center mt-4">
        <span className="col-1 text-md text-light-grey">Step {Object.keys(steps).length + 1}:</span>
        <Form.Control className="col-9" value={stepValue} onChange={(e) => setStepValue(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') onAddClick() }} />
        <div className="col-2 d-flex justify-content-center">
          <div className="uk-button uk-button-primary uk-button-small" onClick={onAddClick}>Add step</div>
        </div>
      </div>
    </div>
  )
}

export default AddSteps
