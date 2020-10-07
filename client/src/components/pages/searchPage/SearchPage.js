import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Api from '../../../apis/Api';
import { Multiselect } from 'multiselect-react-dropdown';
//imported comps
import NavBar from '../common/navigation/NavBar';
import ResultItem from './ResultItem';

const SearchPage = () => {
  //local comp state
  const [results, setResults] = useState([]);
  const [ingredientsData, setIngredientsData] = useState([]); // to hold all ingredient data to show on the multi select field (loaded from ingredient database)
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [exact, setExact] = useState(false)

  const getResults = async () => {
    if (selectedIngredients.length > 0) {
      const ingredients = selectedIngredients.map(el => el.name);

      const response = await Api.post('/getrecipes', { filters: { ingredients }, exact });
      console.log(response.data)
      setResults(response.data);
    } else setResults([])
  }

  useEffect(() => {
    getResults()
  }, [selectedIngredients, exact])

  const getIngredientsData = async () => {
    const response = await Api.get('/ingredients/data');
    setIngredientsData(response.data);
  }

  useEffect(() => {
    getIngredientsData()
  }, [])

  const onSelect = (values) => {
    setSelectedIngredients(values)
  }

  const onRemove = (values) => {
    setSelectedIngredients(values)
  }

  return (
    <div>
      <NavBar />

      <div className="uk-section uk-section-default uk-padding-remove-top">
        <div className="uk-container">
          <div data-uk-grid>
            <span className="uk-search uk-search-default uk-width-1-1 uk-margin-small-bottom">

              {/* <input className="uk-search-input uk-text-small uk-border-rounded uk-form-large" type="search" placeholder="Search for recipes..." /> */}
              <Row className="align-items-center">
                <Col md={8}>
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
                <Col md={2}>
                  <Form.Check
                    checked={exact}
                    onChange={(e) => setExact(e.target.checked)}
                    type="checkbox"
                    className="mr-sm-2"
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
            </span>
          </div>

          <div className="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-margin-medium-top" data-uk-grid>

            {results && results.map(recipe => <ResultItem key={recipe._id} recipe={recipe} />)}


          </div>
          <div className="uk-margin-large-top uk-text-small">
            <ul className="uk-pagination uk-flex-center uk-text-500 uk-margin-remove" data-uk-margin>
              <li><a href="#"><span data-uk-pagination-previous></span></a></li>
              <li><a href="#">1</a></li>
              <li className="uk-disabled"><span>...</span></li>
              <li><a href="#">5</a></li>
              <li><a href="#">6</a></li>
              <li className="uk-active"><span>7</span></li>
              <li><a href="#">8</a></li>
              <li><a href="#"><span data-uk-pagination-next></span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
