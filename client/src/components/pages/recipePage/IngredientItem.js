import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { measurementUnits } from '../../../configs/dropdownOptions';
import CustomToggle from '../common/CustomToggleDropdown/CustomToggleDropdown';

const IngredientItem = ({ ingredient, i, calculationData, unit }) => {
  const [displayUnit, setDisplayUnit] = useState(unit)

  useEffect(() => {
    setDisplayUnit(unit)
  }, [unit])

  return (
    <div key={ingredient._id} className="uk-grid-small uk-margin-medium-top" data-uk-grid>
      <div className="uk-width-auto">
        <i className="uk-step-icon" data-uk-icon="ratio: 0.8">{i + 1}</i>
      </div>
      <div className="uk-width-expand">
        {ingredient.ingredientData && <h5 className="uk-step-title uk-text-500 uk-text-uppercase uk-text-primary" data-uk-leader="fill:—">{ingredient.ingredientData.name}</h5>}
        <div className="d-flex align-items-center justify-content-between">
          <div className="uk-step-content">Amount: {getIngredientAmount(ingredient.ingredientRatio, ingredient.convertedAmount, calculationData.servingSize, calculationData.servingAmount, displayUnit)} {displayUnit}</div>
          <div className="d-flex align-items-center">
            <CustomToggle optionsArray={measurementUnits} onItemClick={(option) => setDisplayUnit(option)}>
              <div className="d-flex align-items-center pointer">
                <span>Change Unit</span>
                <span className="material-icons ml-2 text-light text-md">keyboard_arrow_down</span>
              </div>
            </CustomToggle>
          </div>
        </div>
      </div>
    </div>
  )
}

const getIngredientAmount = (ratio, convertedAmount, servingSize, servingAmount, displayUnit) => {
  const parsedRatio = parseFloat(ratio);
  const parsedServingAmount = parseFloat(servingAmount);
  const conversionFactor = convertAmount(displayUnit)

  let result = 0;

  if (servingSize === 'servings') {
    result = convertedAmount * parsedServingAmount * conversionFactor;
  } else {
    result = ratio * multiplyFactor(servingSize) * parsedServingAmount * conversionFactor;
  }

  if (displayUnit === 'mL.') result = Math.round(result * 10) / 10;
  else if (displayUnit === 'cL.') result = Math.round(result * 10) / 10;
  else if (displayUnit === 'fl. oz') result = Math.round(result * 100) / 100;
  else result = Math.round(result * 1000) / 1000;

  if (result % 1 > 0.98) result = Math.ceil(result);
  if (result % 1 < 0.01) result = Math.floor(result);

  return result;
}

const convertAmount = (unit) => {

  if (unit === 'Gallon') return 0.000264;
  if (unit === 'Liter') return 0.001;
  if (unit === 'Cup') return 0.004227;
  if (unit === 'fl. oz') return 0.033818;
  if (unit === 'mL.') return 1;
  if (unit === 'cL.') return 0.1;
  return 1
}

const multiplyFactor = (unit) => {

  if (unit === 'Gallon') return 3785.41;
  if (unit === 'Liter') return 1000;
  if (unit === 'Cup') return 236.59;
  if (unit === 'fl. oz') return 29.57;
  if (unit === 'mL.') return 1;
  if (unit === 'cL.') return 10;
  return 1
}
export default IngredientItem
