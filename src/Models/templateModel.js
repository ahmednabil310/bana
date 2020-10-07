
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var templateModel = new Schema({
    field01: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'a reference model name'
    },
    field02: {
        type: String,
    }
}, {
    collection: 'collectionName',
    timestamps: true
});

templateModel.statics.someModelFunction = () => {
    // here you can access ModelName
}

const ModelName = mongoose.model('name', templateModel);

module.exports = ModelName;