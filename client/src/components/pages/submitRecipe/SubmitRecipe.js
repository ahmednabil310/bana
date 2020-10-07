import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Spinner } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import Api from '../../../apis/Api';
import qs from 'qs';
import history from '../../../history';
//imported Comps
import NavBar from '../common/navigation/NavBar';
import IngredientForm from './IngredientForm';
import ImageUpload from '../common/ImageUpload/ImageUpload';
import AddSteps from './AddSteps';
import CustomPopover from '../common/CustomPopover/CustomPopover';
import ImageCropper from '../common/ImageCropper/ImageCropper';

const SubmitRecipe = () => {
  const query = qs.parse(history.location.search, { ignoreQueryPrefix: true });

  //using refs
  const multiSelectRef = useRef(null)
  //redux store state
  const accessToken = useSelector(state => state.accessToken);
  const currentUser = useSelector(state => state.currentUser);
  //comp local store
  const [ingredientsData, setIngredientsData] = useState([]); // to hold all ingredient data to show on the multi select field (loaded from ingredient database)
  //form fields
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeImages, setRecipeImages] = useState([]);
  const [recipeStrength, setRecipeStrength] = useState('');
  const [recipeDifficulty, setRecipeDifficulty] = useState('');
  const [recipeVideo, setRecipeVideo] = useState('');
  const [steps, setSteps] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [numberOfServings, setNumberOfServings] = useState(1);
  //errors structure {id: {options: 'error', unit: 'error', amount: 'error'}}
  const [errors, setErrors] = useState({});
  //for uploading indicators
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState({})
  //success message
  const [message, setMessage] = useState('')

  const getIngredientsData = async () => {
    const response = await Api.get('/ingredients/data');
    setIngredientsData(response.data);
  }

  const getRecipeData = async (id) => {
    const response = await Api.get(`/recipe/data?id=${query.id}`);
    console.log(response.data)
    //setting initial form values
    const recipe = response.data[0];
    console.log(recipe)

    setRecipeName(recipe.recipeName)
    setRecipeDescription(recipe.recipeDescription)
    setRecipeImages(recipe.images)
    setRecipeStrength(recipe.strength)
    setRecipeDifficulty(recipe.difficulty)
    setRecipeVideo(recipe.video)
    setSteps(recipe.steps)
    setNumberOfServings(recipe.numberOfServings)
    //setting ingredients
    const ingredients = recipe.ingredients.map(el => {
      const ingredient = {
        amount: el.enteredAmount,
        unit: el.enteredUnit,
        category: el.ingredientData.category,
        name: el.ingredientData.name,
        _id: el.ingredientData._id,
      }

      return ingredient;
    })
    setSelectedIngredients(ingredients)
  }

  useEffect(() => {
    //1. geting ingredients data
    getIngredientsData()

    //2. checking if there is a recipe id in the query strings and if so, will get the recipe data then assign to each form field so it can be edited.
    if (query.id) {
      getRecipeData(query.id)
    }
  }, [])

  const onSelect = (values) => {
    console.log(selectedIngredients)
    console.log(values)
    setSelectedIngredients(values)
  }

  const onRemove = (values) => {
    setSelectedIngredients(values)
  }

  const onImageUploadClick = (newImage) => {
    setUploading(false);
    console.log(newImage)
    setRecipeImages([...recipeImages, newImage])
    document.body.click()
  }

  const onUploadClick = async () => {
    console.log(selectedIngredients)
    let newErrors = {};

    if (!recipeName) newErrors.recipeName = 'Please enter recipe name';
    if (!recipeDescription) newErrors.recipeDescription = 'Please enter recipe description';
    if (recipeImages.length === 0) newErrors.recipeImages = 'Please upload at least 1 image';
    if (!recipeStrength) newErrors.recipeStrength = 'Please enter recipe strength';
    if (!recipeDifficulty) newErrors.recipeDifficulty = 'Please enter recipe difficulty';
    if (selectedIngredients.length === 0) newErrors.selectedIngredients = 'Please choose ingredients';
    if (steps.length === 0) newErrors.steps = 'Please Add how to make';
    if (typeof parseInt(numberOfServings) !== 'number' || numberOfServings < 1) newErrors.numberOfServings = 'Please choose number of servings';

    selectedIngredients.forEach(ingredient => {
      const newError = {};
      if (!ingredient.unit) newError.unit = 'Please enter unit';
      if (!ingredient.amount) newError.amount = 'Please enter amount';
      if (Object.keys(newError).length > 0) newErrors[ingredient._id] = newError;
    })

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);
    else setErrors({});

    const recipe = {
      recipeName: recipeName,
      owner: currentUser._id,
      recipeDescription: recipeDescription,
      strength: recipeStrength,
      difficulty: recipeDifficulty,
      video: recipeVideo,
      images: recipeImages,
      numberOfServings: parseInt(numberOfServings),
      steps,
      ingredients: selectedIngredients.map(el => {
        return {
          ingredientId: el._id,
          unit: el.unit,
          amount: el.amount
        }
      })
    }

    if (query.id) recipe._id = query.id;

    const response = await Api.post('/uploadrecipe', { recipe }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    console.log(response.data)

    if (!response.data.error) {

      //success message
      const msg = query.id ? 'Recipe updated successfuly' : 'Recipe uploaded successfuly';
      setMessage(msg)
      setTimeout(() => {
        setMessage('')
      }, 3000);

      if (!query.id) {
        //reseting form
        setRecipeName('')
        setRecipeDescription('')
        setRecipeImages([])
        setRecipeStrength('')
        setRecipeDifficulty('')
        setRecipeVideo('')
        setSelectedIngredients([])
        //reseting the multi select field
        multiSelectRef.current.resetSelectedValues();
      }
    }
  }

  const onImageDeleteClick = (image) => {
    setRecipeImages(recipeImages.filter(el => el !== image))
  }

  return (
    <div>
      <NavBar />

      <div className="uk-section uk-section-default uk-padding-remove-top">
        <div className="uk-container">
          <h3 className="text-dark-grey mt-5">Submit Recipe</h3>

          <div className="d-flex">
            <Row className="container mx-0 px-0">
              <Col md="4" className="mx-0 px-0">
                <Form.Group>
                  <Form.Label>Recipe Name</Form.Label>
                  <Form.Control value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
                  {errors.recipeName && <div className="error" style={{ color: 'red' }}>{errors.recipeName}</div>}
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group controlId="formGrid" >
                  <Form.Label>Strength</Form.Label>
                  <Form.Control as="select" type="select" placeholder="Difficulty" value={recipeStrength} onChange={(e) => setRecipeStrength(e.target.value)}>
                    <option value="">Choose Strength</option>
                    <option value={1}>Non-Alcoholic</option>
                    <option value={2}>Weak</option>
                    <option value={3}>Medium</option>
                    <option value={4}>Strong</option>
                  </Form.Control>
                  {errors.recipeStrength && <div className="error" style={{ color: 'red' }}>{errors.recipeStrength}</div>}
                </Form.Group>
              </Col>
              <Col md="4" className="mx-0 px-0">
                <Form.Group controlId="formGrid">
                  <Form.Label>Choose Difficulty</Form.Label>
                  <Form.Control as="select" type="select" placeholder="Difficulty" value={recipeDifficulty} onChange={(e) => setRecipeDifficulty(e.target.value)}>
                    <option value="">Choose Difficulty</option>
                    <option value={1}>Easy</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Hard</option>
                  </Form.Control>
                  {errors.recipeDifficulty && <div className="error" style={{ color: 'red' }}>{errors.recipeDifficulty}</div>}
                </Form.Group>
              </Col>
              <Col md="12" className="mx-0 px-0">
                <Form.Group>
                  <Form.Label>Recipe Description</Form.Label>
                  <Form.Control as="textarea" type="textarea" style={{ height: 100 }} value={recipeDescription} onChange={(e) => setRecipeDescription(e.target.value)} />
                  {errors.recipeDescription && <div className="error" style={{ color: 'red' }}>{errors.recipeDescription}</div>}
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* ----------------- Upload Images Section -----------------*/}
          <div className="mt-5">
            <div className="d-flex">
              <h3 className="text-dark-grey mb-0">Images</h3>
              {uploadError.message && <div className="ml-5" style={{ color: uploadError.background }}>{uploadError.message}</div>}
            </div>
            <p className="text-light mt-0 mb-2">You can upload up to 5 images that has a miximum size of 1MB.</p>
            <div className="d-flex">

              {recipeImages.map(image => {
                return (
                  <div className="uploaded-image-container">
                    <img key={image} className="uploaded-image mr-2" src={image} alt="upload image" />
                    <div className="bgr-grey-circle d-flex justify-content-center align-items-center pointer">
                      <span className="material-icons text-md text-bold m-0 p-0" onClick={() => onImageDeleteClick(image)}>close</span>
                    </div>
                  </div>
                )
              })}

              {recipeImages.length < 5 &&
                <CustomPopover
                  trigger={
                    <div className="upload-image-button">
                      {uploading ? <Spinner className="mx-auto" animation="border" /> : <span className="material-icons">publish</span>}
                    </div>
                  }
                  content={<ImageCropper aspectRatio={3 / 2} onCropFinish={onImageUploadClick} />}
                  placement="right"
                  title="Upload Image"
                  rootClose={false}
                />
                // <ImageUpload
                //   recipeImages={recipeImages}
                //   setUploadError={setUploadError}
                //   alertContainer="alert-container"
                //   trigger={
                //     <div className="upload-image-button">
                //       {uploading ? <Spinner className="mx-auto" animation="border" /> : <span className="material-icons">publish</span>}
                //     </div>
                //   }
                //   onImageUploadClick={onImageUploadClick}
                //   setUploading={setUploading}
                // />
              }

            </div>
            {errors.recipeImages && <div className="error" style={{ color: 'red' }}>{errors.recipeImages}</div>}

          </div>

          {/* ----------------- Vedio URL Section -----------------*/}
          <div className="mt-5">
            <h3 className="text-dark-grey mb-0">Video link (optional)</h3>
            <p className="text-light mt-0 mb-2">The URL to a video hosted on YouTube or Vimeo. Please enter the full URL with "http://" prefix</p>
            <Form.Group >
              <Form.Control value={recipeVideo} onChange={(e) => setRecipeVideo(e.target.value)} />
            </Form.Group>
          </div>

          {/* ----------------- Steps Section -----------------*/}
          <AddSteps steps={steps} setSteps={setSteps} />
          {errors.steps && <div className="error ml-2" style={{ color: 'red' }}>{errors.steps}</div>}

          {/* ----------------- Ingredients Section -----------------*/}
          <div className="mt-5">
            <h3 className="text-dark-grey mb-0">Recipe Ingredient</h3>
            <p className="text-light mt-0 mb-2">You can add any number of ingredients.</p>
            <Multiselect
              ref={multiSelectRef}
              options={ingredientsData} // Options to display in the dropdown
              // isObject={false} //add if using plain array
              selectedValues={selectedIngredients} // Preselected value to persist in dropdown
              onSelect={onSelect} // Function will trigger on select event
              onRemove={onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options (if using object not plain array)
              closeOnSelect
              placeholder="Add ingredients"
            />
            {errors.selectedIngredients && <div className="error" style={{ color: 'red' }}>{errors.selectedIngredients}</div>}

            {selectedIngredients.length > 0 && <div className="mt-5">
              <div>
                <Form.Group className="d-flex align-items-center">
                  <Form.Label className="col-2">Number of Servings</Form.Label>
                  <Form.Control type="number" className="col-1" size="small" value={numberOfServings} onChange={(e) => setNumberOfServings(e.target.value)} />
                  {errors.numberOfServings && <div className="error ml-2" style={{ color: 'red' }}>{errors.numberOfServings}</div>}
                </Form.Group>
              </div>
              {selectedIngredients.map(ingredient => {
                return (
                  <IngredientForm key={ingredient._id} selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} ingredient={ingredient} errors={errors} />
                )
              })}
            </div>}
          </div>

          {/* ----------------- Submit Button -----------------*/}
          <div className="d-flex justify-content-center mt-5 mb-0">
            <div className="uk-button uk-button-primary mb-0" onClick={onUploadClick}>Upload Recipe</div>
          </div>
          {message && <div className="d-flex justify-content-center mt-2 m-0 p-0">
            <p className="text-green m-0 p-0">{message}</p>
          </div>}

        </div>


      </div>
    </div>
  )
}

export default SubmitRecipe
