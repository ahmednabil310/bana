import React from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import { measurementUnits } from '../../../configs/dropdownOptions';

const IngredientForm = ({ ingredient, selectedIngredients, setSelectedIngredients, errors }) => {
  const error = errors[ingredient._id];

  // const onOtionsChange = (e) => {
  //   const modifiedIngredient = { ...ingredient, option: e.target.value }
  //   updateSelectedIngredients(modifiedIngredient)
  // }

  const onUnitChange = (e) => {
    const modifiedIngredient = { ...ingredient, unit: e.target.value }
    updateSelectedIngredients(modifiedIngredient)
  }

  const onAmountChange = (e) => {
    const modifiedIngredient = { ...ingredient, amount: e.target.value }
    updateSelectedIngredients(modifiedIngredient)
  }

  const updateSelectedIngredients = (ing) => {
    const newSelected = selectedIngredients.map(el => {
      if (el._id === ing._id) return ing;
      else return el;
    })
    console.log(newSelected)

    setSelectedIngredients(newSelected);
  }

  return (
    <Card className="mt-2">
      <Card.Header className="p-0">
        <p className="px-2 py-1 m-0 text-highliten text-lg" key={ingredient._id}>{ingredient.name}</p>
      </Card.Header>
      <Card.Body className="px-2 py-1">
        <Row className="container mx-0 px-0">

          {/* {ingredient.options && ingredient.options.length > 0 && <Col md="4" className="mx-0 px-0">
            <Form.Group controlId="formOptions" className="pl-2" onChange={onOtionsChange}>
              <Form.Label>Options</Form.Label>
              <Form.Control as="select" type="select" placeholder="Choose an option" size="small">
                <option value="">Choose an option</option>
                {ingredient.options.map(option => <option value={option._id}>{option.option}</option>)}
              </Form.Control>
              {error && error.options && <div className="error" style={{ color: 'red' }}>{error.options}</div>}
            </Form.Group>
          </Col>} */}

          <Col md="4" className="mx-0 px-0">
            <Form.Group controlId="formUnit" className="pl-2">
              <Form.Label>Measurement Unit</Form.Label>
              <Form.Control as="select" type="select" placeholder="Unit" size="small" value={ingredient.unit} onChange={onUnitChange}>
                <option value="">Choose Unit</option>
                {measurementUnits.map(unit => <option key={unit} value={unit}>{unit}</option>)}
              </Form.Control>
              {error && error.unit && <div className="error" style={{ color: 'red' }}>{error.unit}</div>}
            </Form.Group>
          </Col>

          <Col md="4" className="mx-0 px-0">
            <Form.Group className="pl-2" controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control size="small" type="number" value={ingredient.amount} onChange={onAmountChange} />
              {error && error.amount && <div className="error" style={{ color: 'red' }}>{error.amount}</div>}
            </Form.Group>
          </Col>

        </Row>
      </Card.Body>
    </Card>
  )
}

export default IngredientForm
