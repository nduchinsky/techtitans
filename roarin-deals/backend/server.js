// setting up basic Express server
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config(); // load variables from .env

// create instance of express app
const app = express();
const port = process.env.PORT || 3000;

// setup PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// function to create/edit/delete a table



// start the server, insert other commands to create/edit/delete tables
app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    // commands to call create/edit/delete functions
})