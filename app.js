/* 1st:
const express = require("express")
const app = express()
const path = require('path');

// app.get('/', (req, res)=>{
//     res.send('<h1>Hello World!</h1>')
// }) 

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define a route for the root path ("/") to send the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend.html'), { "content-type": "text/html" });
});

app.listen(3000, ()=>{
    console.log("server is listening..");
}) */





/* 2nd:
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");



const connection = db.establishConnection();
// Now you can use the 'connection' object for your database operations
// Don't forget to close the connection when you're done
// connection.end();



const app = express();
const path = require('path');

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
// Serve static files from the "public" directory
app.use(express.static('public'));
// Define a route for handling form submissions
app.post('/submit', (req, res) => {
    // Access form data from req.body
    const formData = req.body;
    console.log(formData);
    // Your logic to handle the form data goes here
    res.send('Form submitted successfully!');
});



// Define a route for the root path ("/") to send the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend.html'), { "content-type": "text/html" });
});



app.listen(3000, () => {
    console.log("Server is listening...");
}); */


const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const path = require('path');

const connection = db.establishConnection();

const app = express();

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
// Serve static files from the "public" directory
app.use(express.static('public'));

// Define a route for handling form submissions
app.post('/submit', (req, res) => {
    // Access form data from req.body
    const formData = req.body;
    console.log(formData);

    // Your logic to handle the form data goes here
    // Example: Insert data into the 'student'
    const insertQuery = 'INSERT INTO student (name, email, mobile, city, password) VALUES (?, ?, ?, ?, ?)';
    const values = [formData.name, formData.email, formData.mobile, formData.city, formData.password];

    connection.query(insertQuery, values, (error, results) => {
        if (error) {
            console.error('Error performing database operation:', error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Data inserted successfully');
            res.send('Form submitted successfully!');
        }
    });
});

// Define a route for the root path ("/") to send the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/frontend.html'), { "content-type": "text/html" });
});

app.listen(3000, () => {
    console.log("Server is listening...");
});