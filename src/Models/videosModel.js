
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var videosModel = new Schema({
    title: {
        type: String,
    },
    cover: {
        type: String,
    },
    url: {
        type: String,
    },
    type: {
        type: String, //will be either 'userVideo', 'companyVideo'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    collection: 'videos',
    timestamps: true
});

videosModel.statics.someModelFunction = () => {
    // here you can access videos
}

const videos = mongoose.model('videos', videosModel);

module.exports = videos;