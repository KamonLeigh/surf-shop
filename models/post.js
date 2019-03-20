const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    price: String,
    description: String,
    images: [{
        url: String,
        public_id: String
    }],
    location: String,
    lat: Number,
    lng: Number,
    author: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});


module.exports = mongoose.model('Post', PostSchema);




/* 
    Post
    - title - string
    - price - string
    - decription - string
    - images - an array of strings
    - location - string
    - lat - number
    - long - number 
    - author - object id (ref user)
    - reviews array of objects

*/