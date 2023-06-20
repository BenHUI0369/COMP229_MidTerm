const express = require('express');
const bodyParser = require('body-parser');
const PORT = 4000;

// create express app
const app = express();

// parse application
app.use(bodyParser.urlencoded({ extended: true }))

// parser application/json
app.use(bodyParser.json());

// configuring the database
const dbCongif = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connecting to the data base
mongoose.connect(dbCongif.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log("Could not connect to the database");
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to the COMP-229 Mid Term"
    });
})

require('./app/routes/student.routes.js')(app);

// listen for request
app.listen(PORT, () => {
    console.log("Server is listening on Port: " + PORT);
});