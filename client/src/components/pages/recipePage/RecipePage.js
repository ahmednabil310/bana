import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import history from '../../../history';
import { measurementUnits } from '../../../configs/dropdownOptions';
import Api from '../../../apis/Api';
//imported comps
import NavBar from '../common/navigation/NavBar';
import Footer from '../common/footer/Footer';
import ImageSlider from '../common/ImageSlider/ImageSlider';
import RecipeIngredients from './RecipeIngredients';
import StepsTagsShare from './StepsTagsShare';
import RecipeComments from './RecipeComments';
import SimilarRecipes from './SimilarRecipes';

const RecipePage = () => {
  //comp local state
  const [recipeId, setRecipeId] = useState(history.location.pathname.replace('/recipe/', ''));
  const [recipe, setRecipe] = useState('');
  const [servingSize, setServingSize] = useState('servings');
  const [servingAmount, setServingAmount] = useState('');
  const [calculationData, setCalculationData] = useState({});
  const [calculatedNoOfServings, setCalculatedNoOfServings] = useState('');
  const [errors, setErrors] = useState({});

  const getRecipeData = async (id) => {
    const response = await Api.get('/recipe/data', { params: { id } });

    console.log(response.data)

    if (response.data.length > 0) {
      setRecipe(response.data[0]);
      console.log(response.data[0])
    }
  }

  useEffect(() => {
    getRecipeData(recipeId);
  }, [])

  const onMixClick = () => {
    const newErrors = {};
    if (!servingAmount) newErrors.amount = "Please add amount";
    if (recipe.ingredients.length === 0) newErrors.amount = "This Recipe does not have ingredients";

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);
    setErrors({});

    const defaultUnit = recipe.ingredients[0].enteredUnit;
    setCalculationData({ servingSize, servingAmount, defaultUnit });

    //if user choose any unit other than servings, then we will calculate how many servings based on the unit and the amount entered
    if (servingSize !== 'servings') {
      const noOfServings = convertAmount(servingAmount, servingSize, recipe.totalMoleAmount);
      setCalculatedNoOfServings(noOfServings);
    }
  }

  return (
    <div>
      <NavBar />

      <div className="uk-container mb-5">
        <div data-uk-grid>
          <div className="uk-width-1-2@s">
            {/* <div><img className="uk-border-rounded-large" src="https://via.placeholder.com/600x600" alt="Image alt" /></div> */}
            <ImageSlider imagesArray={recipe.images} />
          </div>
          <div className="uk-width-expand@s uk-flex uk-flex-middle">
            <div className="w-100">
              <div>
                <h1>{recipe.recipeName}</h1>
                <p>{recipe.recipeDescription}</p>
                <div className="uk-margin-medium-top uk-child-width-expand uk-text-center uk-grid-divider" data-uk-grid>
                  <div>
                    <span data-uk-icon="icon: clock; ratio: 1.4"></span>
                    <h5 className="uk-text-500 uk-margin-small-top uk-margin-remove-bottom">Difficulty</h5>
                    <span className="uk-text-small">{getDifficulty(recipe.difficulty)}</span>
                  </div>
                  <div>
                    <span data-uk-icon="icon: future; ratio: 1.4"></span>
                    <h5 className="uk-text-500 uk-margin-small-top uk-margin-remove-bottom">Strength</h5>
                    <span className="uk-text-small">{getStrength(recipe.strength)}</span>
                  </div>
                  <div>
                    <span data-uk-icon="icon: users; ratio: 1.4"></span>
                    <h5 className="uk-text-500 uk-margin-small-top uk-margin-remove-bottom">Made By</h5>
                    {recipe.ownerData && <span className="uk-text-small">{recipe.ownerData.name}</span>}
                  </div>
                </div>
              </div>
              <hr />

              {/* ---------------------- Mixing Section ---------------------- */}
              <div data-uk-grid>
                <Row className="container">
                  <Col md="4" className="mx-0 px-0">
                    <Form.Group controlId="formUnit" className="pl-2">
                      {/* <Form.Label>Serving size</Form.Label> */}
                      <Form.Control as="select" type="select" placeholder="Unit" size="small" value={servingSize} onChange={(e) => setServingSize(e.target.value)}>
                        <option value="servings">Choose Serving Size</option>
                        {measurementUnits.map(unit => <option key={unit}>{unit}</option>)}
                      </Form.Control>
                      {errors && errors.serving && <div className="error" style={{ color: 'red' }}>{errors.serving}</div>}
                    </Form.Group>
                  </Col>

                  <Col md="4" className="mx-0 px-0">
                    <Form.Group className="pl-2" controlId="formAmount">
                      {/* <Form.Label>Amount</Form.Label> */}
                      <Form.Control size="small" type="number" value={servingAmount} onChange={(e) => setServingAmount(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') onMixClick() }} />
                      {errors && errors.amount && <div className="error" style={{ color: 'red' }}>{errors.amount}</div>}
                    </Form.Group>
                  </Col>

                  <Col md="4" className="mx-0 px-0">
                    <Form.Group className="pl-2" controlId="formAmount">
                      <button className="uk-button uk-button-primary uk-button-small" onClick={onMixClick}>Mix</button>
                      {/* {error && error.amount && <div className="error" style={{ color: 'red' }}>{error.amount}</div>} */}
                    </Form.Group>
                    {/* <button className="uk-button uk-button-primary uk-button-large" >Mix</button> */}
                  </Col>

                  <Col md="12" className="mx-0 px-0">
                    {calculatedNoOfServings && <p className="pl-2 text-highliten">Total Servings: {calculatedNoOfServings}</p>}
                  </Col>

                </Row>

                {/* <div className="uk-width-auto@s uk-text-small">
                  <p className="uk-margin-small-top uk-margin-remove-bottom">Created by <span>Alex Williamns</span></p>
                  <span className="uk-text-muted">21 recipes</span>
                </div>
                <div className="uk-width-expand@s uk-flex uk-flex-middle uk-flex-right@s">
                  <i className="uk-icon-link" data-uk-icon="icon: plus-circle; ratio: 1.2"
                    data-uk-tooltip="title: Save Recipe"></i>
                  <i className="uk-icon-link uk-margin-left" data-uk-icon="icon: cart; ratio: 1.2"
                    data-uk-tooltip="title: Shopping List"></i>
                  <i className="uk-icon-link uk-margin-left" data-uk-icon="icon: print; ratio: 1.2"
                    data-uk-tooltip="title: Print Recipe"></i>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {calculationData.servingAmount && <div className="uk-section uk-section-default">
        <div className="uk-container uk-container-small">
          <div className="uk-grid-large" data-uk-grid>
            <div className="uk-width-expand@m">
              <div className="uk-article">
                {calculationData.servingSize && calculationData.servingAmount && <RecipeIngredients ingredients={recipe.ingredients} calculationData={calculationData} />}
                <hr className="uk-margin-medium-top uk-margin-large-bottom" />
                <h3>Comments</h3>
                <RecipeComments />
              </div>
            </div>
            <StepsTagsShare steps={recipe.steps} />
          </div>
        </div>
      </div>}

      {recipe && <SimilarRecipes recipe={recipe} />}

      <Footer />
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

const convertAmount = (amount, unit, moleAmount) => {
  const parsedAmount = parseFloat(amount);

  let result = 0;
  if (unit === 'Gallon') result = parsedAmount * 3785.41 / moleAmount;
  if (unit === 'Liter') result = parsedAmount * 1000 / moleAmount;
  if (unit === 'Cup') result = parsedAmount * 236.59 / moleAmount;
  if (unit === 'fl. oz') result = parsedAmount * 29.57 / moleAmount;
  if (unit === 'mL.') result = parsedAmount / moleAmount;
  if (unit === 'cL.') result = parsedAmount * 10 / moleAmount;

  return Math.round(result * 100) / 100;
}


export default RecipePage
