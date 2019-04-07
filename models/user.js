const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        secure_url: { type: String, default: '/images/default-profile.jpg'},
        public_id: String
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

UserSchema.plugin(passportLocalMongoose);
//UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });


module.exports = mongoose.model('User', UserSchema);



/*
    User
    -email - string
    -password - string
    -username - string
    -image - array of strings string
    -posts - array of objects ref Post

*/