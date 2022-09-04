const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

User = mongoose.model('User', UserModelSchema);
module.exports = User;