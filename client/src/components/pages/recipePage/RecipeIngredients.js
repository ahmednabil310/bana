import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { measurementUnits } from '../../../configs/dropdownOptions';
import CustomToggle from '../common/CustomToggleDropdown/CustomToggleDropdown';

//imported Comps
import IngredientItem from './IngredientItem'

const RecipeIngredients = ({ ingredients, calculationData }) => {
  const [unit, setUnit] = useState(calculationData.defaultUnit);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3>Ingredients</h3>
        <CustomToggle optionsArray={measurementUnits} onItemClick={(option) => setUnit(option)}>
          <div className="d-flex align-items-center pointer">
            <span>Change All Units</span>
            <span className="material-icons ml-2 text-light text-md">keyboard_arrow_down</span>
          </div>
        </CustomToggle>
      </div>
      {ingredients && ingredients.map((ingredient, i) => {
        return (
          <IngredientItem key={ingredient._id} ingredient={ingredient} i={i} calculationData={calculationData} unit={unit} />
        )
      })}
    </div>
  )
}

export default RecipeIngredients
