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

// user name retrieval
app.get('/user_name', (req, res) => {
    conn.query("select fname from user where ( mail='" + userDetails.mail + "');", function (err, result) {
        if (err)
            throw err;
        res.send(result);
    })
});

// created datetime
let currentTimestamp = {};
const currentDate = new Date(); // console.log(currentDate);

// user backlog task insertion
app.post("/backlog_task", function (req, res) {
    console.log(req.body);
    console.log("user task");
    conn.query("insert into backtask(mail,backtkname, backtkdesc, backtkdate)values('" + userDetails.mail + "','" + req.body.backtkname + "','" + req.body.backtkdesc + "','" + currentDate + "');", function (err, result) {
        if (err)
            throw err;
        console.log(result);
    });
    res.send("insert");
})

// user backlog task retrieval
app.get('/backtk_fetch', (req, res) => {
    conn.query("select backtkname, backtkdesc, backtkdate from backtask where ( mail='" + userDetails.mail + "');", function (err, result) {
        if (err)
            throw err;
        res.send(result);
    })
});

// user to do task insertion
app.post("/todo_task", function (req, res) {
    console.log(req.body);
    console.log("user task");
    conn.query("insert into todotask(mail,todotkname, todotkdesc, todotkdate)values('" + userDetails.mail + "','" + req.body.todotkname + "','" + req.body.todotkdesc + "','" + currentDate + "');", function (err, result) {
        if (err)
            throw err;
        console.log(result);
    });
    res.send("insert");
})

// user to do task retrieval
app.get('/todotk_fetch', (req, res) => {
    conn.query("select todotkname, todotkdesc, todotkdate from todotask where ( mail='" + userDetails.mail + "');", function (err, result) {
        if (err)
            throw err;
        res.send(result);
    })
});

// user doing task insertion
app.post("/doing_task", function (req, res) {
    console.log(req.body);
    console.log("user task");
    conn.query("insert into doingtask(mail,doingtkname, doingtkdesc, doingtkdate)values('" + userDetails.mail + "','" + req.body.doingtkname + "','" + req.body.doingtkdesc + "','" + currentDate + "');", function (err, result) {
        if (err)
            throw err;
        console.log(result);
    });
    res.send("insert");
})

// user doing task retrieval
app.get('/doingtk_fetch', (req, res) => {
    conn.query("select doingtkname, doingtkdesc, doingtkdate from doingtask where ( mail='" + userDetails.mail + "');", function (err, result) {
        if (err)
            throw err;
        res.send(result);
    })
});

// user done task insertion
app.post("/done_task", function (req, res) {
    console.log(req.body);
    console.log("user task");
    conn.query("insert into donetask(mail,donetkname, donetkdesc, donetkdate)values('" + userDetails.mail + "','" + req.body.donetkname + "','" + req.body.donetkdesc + "','" + currentDate + "');", function (err, result) {
        if (err)
            throw err;
        console.log(result);
    });
    res.send("insert");
})

// user done task retrieval
app.get('/donetk_fetch', (req, res) => {
    conn.query("select donetkname, donetkdesc, donetkdate from donetask where ( mail='" + userDetails.mail + "');", function (err, result) {
        if (err)
            throw err;
        res.send(result);
    })
});