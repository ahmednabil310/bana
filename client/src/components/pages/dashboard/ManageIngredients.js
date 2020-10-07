import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Api from '../../../apis/Api';
//imported comps
import AddIngredientModal from './AddIngredientModal';
import ConfirmModal from '../common/ConfirmModal/ConfirmModal';


const ManageIngredients = () => {
  //redux store satate
  const accessToken = useSelector(state => state.accessToken);
  //comp local state
  const [ingredients, setIngredients] = useState([]);
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const [showConfirm, setShowConfirm] = useState(true);
  const [confirmData, setConfirmData] = useState('');
  const [ingredientToEdit, setIngredientToEdit] = useState(null);

  const getIngredients = async () => {
    const response = await Api.get('/ingredients');
    setIngredients(response.data);
  }

  useEffect(() => {
    getIngredients();
  }, [])

  const onEditClick = (ingredient) => {
    setIngredientToEdit(ingredient)
    setShowAddIngredient(true)
  }

  const onDeleteClick = (ingredient) => {
    setConfirmData({
      payload: ingredient,
      onConfirmClick: deleteIngredient,
      confirmButtonLabel: 'Delete Ingredient',
      confirmButtonVariant: 'danger',
      body: `Are you sure you want to delete "${ingredient.name}"?, this ingredient will be deleted from all recipes having it.`
    })
  }

  const deleteIngredient = async (ingredient) => {

    const response = await Api.delete('/ingredients', {
      data: { id: ingredient._id },
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
    console.log(response.data);

    getIngredients();

    //reset the confirm
    setConfirmData('')
  }

  const getCategories = () => {
    const categories = ingredients.map(el => el._id);
    categories.push('Other');
    return categories
  }

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <h2 className="m-0 p-0">Manage Ingredients</h2>
        <Button className="ml-auto" variant="outline-secondary" size="small" onClick={() => setShowAddIngredient(true)}>Add Ingredient</Button>
        {/* <div>
        <span>Add In</span>
        <span className="text-light-grey ml-3 pointer" data-uk-icon="icon: plus-circle; ratio: 1.3" onClick={() => setShowAddIngredient(true)}></span>
        </div> */}
      </div>
      {ingredients.map(category => {
        return (
          <div className="border-bottom mb-4" key={category._id}>
            <h4 className="text-highliten">{category._id}</h4>
            <Row>
              {category.items.map(ingredient => {
                return (
                  <Col key={ingredient._id} className="mb-3" lg={3} md={4}>
                    <Card>
                      <Card.Header className="d-flex m-0 p-0">
                        <div className="ml-auto mt-1">
                          <span className="material-icons text-red text-md pointer" onClick={() => onDeleteClick(ingredient)}>close</span>
                          <span className="material-icons text-md mx-2 pointer" onClick={() => onEditClick(ingredient)}>create</span>
                        </div>
                      </Card.Header>
                      <Card.Body className="text-center m-2 p-2">
                        <Card.Title className="m-0 p-0">{ingredient.name}</Card.Title>
                        {/* <Card.Text>
                          With supporting text below as a natural lead-in to additional content.
                        </Card.Text> */}
                        {/* <Button variant="primary">Go somewhere</Button> */}
                      </Card.Body>
                      {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </div>
        )
      })}

      <AddIngredientModal showAddIngredient={showAddIngredient} setShowAddIngredient={setShowAddIngredient} categories={getCategories()} ingredient={ingredientToEdit} setIngredientToEdit={setIngredientToEdit} getIngredients={getIngredients} />
      {confirmData && <ConfirmModal confirmData={confirmData} setConfirmData={setConfirmData} />}
    </div>
  )
}

export default ManageIngredients
