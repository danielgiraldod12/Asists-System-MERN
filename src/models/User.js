const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    created_at: {type: Date, Default: Date.now}
})

module.exports = mongoose.model('User',UserSchema);