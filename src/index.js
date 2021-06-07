const express = require('express');
const app = express();
const morgan = require('morgan');
const {mongoose} = require('./database.js');
const path = require('path');

//Settings
app.set('port', process.env.PORT || 3001 )

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/', require('./routes/routes'))

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('server running in ' + app.get('port'));
})