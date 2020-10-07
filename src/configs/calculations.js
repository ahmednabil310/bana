// ingredients = [{amount, unit, ingredientId}]
const createIngredientsArray = (ingredients, numberOfServings) => {
  let ingredientsArray = [];

  for (let index = 0; index < ingredients.length; index++) {
    const el = ingredients[index];
    const record = {
      ingredientId: el.ingredientId,
      enteredUnit: el.unit,
      enteredAmount: parseFloat(el.amount),
      convertedAmount: convertAmount(el.amount, el.unit) / numberOfServings,
      conversionUnit: 'mL.'
    }
    ingredientsArray.push(record)
  }


  let totalAmount = 0; // this will be the total mole amount (FOR 1 SERVING AS THE CONVERTED AMOUNT IS DEVIDED BY THE NUMBER OF SERVINGS)
  ingredientsArray.forEach(el => {
    if (el.convertedAmount !== 'NaN') totalAmount += el.convertedAmount
  });

  ingredientsArray = ingredientsArray.map(el => {
    const ratio = Math.round((el.convertedAmount / totalAmount) * 1000) / 1000;
    return { ...el, ingredientRatio: ratio }
  })

  totalAmount = Math.round(totalAmount * 100) / 100;

  return { ingredientsArray, totalAmount };
}

const convertAmount = (amount, unit) => {
  const parsedAmount = parseFloat(amount);

  let result = 0;
  if (unit === 'Gallon') result = parsedAmount * 3785.41;
  if (unit === 'Liter') result = parsedAmount * 1000;
  if (unit === 'Cup') result = parsedAmount * 236.59;
  if (unit === 'fl. oz') result = parsedAmount * 29.57;
  if (unit === 'mL.') result = parsedAmount;
  if (unit === 'cL.') result = parsedAmount * 10;

  return Math.round(result * 100) / 100;
}

const getIngredientAmount = (ratio, servingSize, servingAmount) => {
  const parsedRatio = parseFloat(ratio);
  const parsedServingSize = parseFloat(servingSize);
  const parsedServingAmount = parseFloat(servingAmount);

  let result = 0;

  if (unit === 'Gallon') result = parsedRatio * 0.000264 * parsedServingAmount;
  if (unit === 'Liter') result = parsedRatio * 0.001 * parsedServingAmount;
  if (unit === 'Cup') result = parsedRatio * 0.004227 * parsedServingAmount;
  if (unit === 'fl. oz') result = parsedRatio * 0.033818 * parsedServingAmount;
  if (unit === 'mL.') result = parsedRatio * parsedServingAmount;
  if (unit === 'cL.') result = parsedRatio * 0.1 * parsedServingAmount;

  return Math.round(result * 100) / 100;
}

module.exports = createIngredientsArray