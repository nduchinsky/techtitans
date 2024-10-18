// setting up basic Express server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./backend/db'); // importing db config

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(bodyParser.json());

// insert routes to fetch or create content


// start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})