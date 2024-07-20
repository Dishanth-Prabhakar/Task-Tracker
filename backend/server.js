const express = require('express');
const app = express();
const mysql = require("mysql2");
const cors = require('cors');
const request = require('request');
const axios = require("axios");
const dotenv = require("dotenv").config();

let PORT = process.env.ListenPort;

app.use(express.json());

app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ['GET', 'POST', 'UPDATE', 'DELETE'],
    credentials: true
}));

app.listen(PORT, () => {
    console.log('started server');
    console.log('Server is running on port ', PORT);
});

const conn = mysql.createConnection({ host: "localhost", user: process.env.dbuser, password: process.env.dbpassword, database: process.env.dbname });

conn.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
})

// user Signup
app.post("/user_signup", function (req, res) {
    conn.query("insert into user(fname,lname,mail,password)values('" + req.body.fname + "','" + req.body.lname + "','" + req.body.mail + "','" + req.body.password + "');", function (err, result) {
        if (err)
            throw err;
        console.log(result);
    });
    res.send("insert");
})

// user login
app.post("/user_login", function (req, res) {
    conn.query("select * from user where ( mail='" + req.body.mail + "') & ( password='" + req.body.password + "');", function (err, result) {
        if (result == "") {
            res.send("wrong");
        } else {
            res.send("right");
        }
    })
})

// login user email address
let userDetails = {};
app.post('/logindetails', (req, res) => {
    const mail = req.body.Mail;
    userDetails.mail = mail;
    console.log('Mail ', mail);
});

// created datetime
let currentTimestamp = {};
const currentDate = new Date();
console.log(currentDate);

// user to do task 
app.post("/user_task", function (req, res) {
    console.log(req.body);
    console.log("user task");
    conn.query("insert into todotask(mail,taskname, taskdesc, created)values('" + userDetails.mail + "','" + req.body.taskname + "','" + req.body.taskdesc + "','" + currentDate + "');", function (err, result) {
        if (err)
            throw err;
        console.log(result);
    });
    res.send("insert");
})


