const mongoose = require('mongoose');

const uri = "mongodb://localhost/mern-asists";

mongoose.connect(uri)
    .then(db => console.log('DB is connected'))
    .catch(error => console.error(error))

module.exports = mongoose;