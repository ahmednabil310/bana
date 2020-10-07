import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import Api from '../../../apis/Api';

const AddIngredientModal = ({ ingredient, showAddIngredient, setShowAddIngredient, categories, setIngredientToEdit, getIngredients }) => {
  //redux store state
  const accessToken = useSelector(state => state.accessToken);
  //comsp local state
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});
  const [responseError, setResponseError] = useState('');

  //categoy options
  let categoryOptions = [];
  if (categories) {
    categoryOptions = categories.map(el => {
      return { value: el, label: el };
    })
  }

  useEffect(() => {
    if (ingredient) {
      setName(ingredient.name);
      setSelectedCategory({ value: ingredient.category, label: ingredient.category });
    }
  }, [ingredient])

  const onModalHide = () => {
    setName('');
    setCategory('');
    setSelectedCategory('')
    setIngredientToEdit(null)
    setShowAddIngredient(false);
  }

  const handleCategoryChange = (selected) => {
    setSelectedCategory(selected)
  }

  const onAddClick = async () => {
    //getting the category
    let finalCategory = '';
    if (selectedCategory && selectedCategory.value !== 'Other') finalCategory = selectedCategory.value;
    else if (selectedCategory && selectedCategory.value === 'Other') finalCategory = category;

    //data validation and setting errors
    let newErrors = {};
    if (!finalCategory) newErrors.category = 'Please choose Category';
    if (!name) newErrors.name = 'Please enter name';

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);
    else setErrors({});

    const data = { name, category: finalCategory };
    if (ingredient) data.id = ingredient._id;
    console.log(data);

    const response = await Api.post('/ingredients/update', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })

    if (response.data.error) return setResponseError(response.data.error);

    //refetching ingredients after update
    getIngredients();

    //resetting values and closing the modal
    setName('');
    setCategory('');
    setSelectedCategory('')
    setIngredientToEdit(null)
    setShowAddIngredient(false);
  }

  return (
    <Modal show={showAddIngredient} onHide={onModalHide} centered className="modal-primary" >
      <Modal.Header closeButton>
        <div className="mb-4">
          <Modal.Title>Add Ingredient</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formName">
          <Form.Control type="text" placeholder="Ingredient Name" value={name} onChange={e => setName(e.target.value)} />
          {errors.name && <div className="error" style={{ color: 'red' }}>{errors.name}</div>}
        </Form.Group>

        <Select
          className="mb-3"
          value={selectedCategory}
          onChange={handleCategoryChange}
          options={categoryOptions}
        />

        {selectedCategory?.value === 'Other' && <Form.Group controlId="formCategory">
          <Form.Control type="text" placeholder="Ingredient Category" value={category} onChange={e => setCategory(e.target.value)} />
        </Form.Group>}
        {errors.category && <div className="error" style={{ color: 'red' }}>{errors.category}</div>}

        <div className="d-flex justify-content-center pt-4">
          <Button variant="primary" size="lg" type="button" onClick={onAddClick}>
            {ingredient ? 'Save' : 'Add Ingredient'}
          </Button>
        </div>
        {responseError && <div className="d-flex justify-content-center pt-4">
          <div className="error" style={{ color: 'red' }}>{responseError}</div>
        </div>}
      </Modal.Body>
    </Modal >
  )
}

export default AddIngredientModal
