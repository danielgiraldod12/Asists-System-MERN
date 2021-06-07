const mongoose = require('mongoose');
const { Schema } = mongoose;

const AsistSchema = new Schema({
    id_user: {type: String, required: true},
    email: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Asist',AsistSchema);