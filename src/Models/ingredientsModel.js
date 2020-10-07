
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ingredientsModel = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {
    collection: 'ingredients',
    timestamps: true
});

ingredientsModel.statics.someModelFunction = () => {
    // here you can access ModelName
}

const ModelName = mongoose.model('ingredient', ingredientsModel);

module.exports = ModelName;