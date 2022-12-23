const responseHelper = require('express-response-helper').helper();
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require('./app/models');

const app = express();

// attach the middleware before any route definition
app.use(responseHelper);
// const codes = responseHelper.responseCodes;
// codes.created = 200; // originally 201

//request ke app tapi beda server
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Modify the status code for 'created' response

// use the middleware
// app.use(responseHelper.helper());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to opo iki application." });
});

app.post('/user', async function (req, res) {
    const users = await db.user.findAll();
    res.respond(users, 200);
});


//routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});