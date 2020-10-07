import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Api from '../../../../apis/Api';
import { Multiselect } from 'multiselect-react-dropdown';

const SearchByIngredients = ({ inputSize, labelSize, onValuesChange }) => {
  //local comp state
  const [results, setResults] = useState([]);
  const [ingredientsData, setIngredientsData] = useState([]); // to hold all ingredient data to show on the multi select field (loaded from ingredient database)
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [exact, setExact] = useState(false)

  const getIngredientsData = async () => {
    const response = await Api.get('/ingredients/data');
    setIngredientsData(response.data);
  }

  useEffect(() => {
    getIngredientsData()
  }, [])

  const onSelect = (values) => {
    setSelectedIngredients(values)
    onValuesChange(values, exact)
  }

  const onRemove = (values) => {
    setSelectedIngredients(values)
    onValuesChange(values, exact)
  }

  return (
    <Row className="align-items-center mb-4">
      <Col md={inputSize}>
        <Multiselect
          options={ingredientsData} // Options to display in the dropdown
          // isObject={false} //add if using plain array
          selectedValues={selectedIngredients} // Preselected value to persist in dropdown
          onSelect={onSelect} // Function will trigger on select event
          onRemove={onRemove} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options (if using object not plain array)
          closeOnSelect
          placeholder="Search recipes"
        />
      </Col>
      <Col md={labelSize}>
        <Form.Check
          checked={exact}
          onChange={(e) => {
            setExact(e.target.checked);
            onValuesChange(selectedIngredients, e.target.checked)
          }}
          type="checkbox"
          className="mr-sm-2 text-sm"
          id="inlineFormCheck"
          label="Recipes I can make."
        />
      </Col>
      <Col md={2}>
        <select className="uk-select uk-select-light uk-width-auto uk-border-pill uk-select-muted">
          <option>Sort by: Latest</option>
          <option>Sort by: Top Rated</option>
          <option>Sort by: Trending</option>
        </select>
      </Col>

    </Row>
  )
}

export default SearchByIngredients
