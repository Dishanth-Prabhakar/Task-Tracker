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
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
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
        // console.log(result);
    });
    res.send("insert");
})

app.post("/google_signup", function (req, res) {
    // console.log("google ",req.body.mail);
    conn.query("select * from user where ( mail='" + req.body.mail + "');", function (err, result) {
        if (result == "") {
            res.send("right");
        } else {
            res.send("present");
        }
    })
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

app.post("/google_login", function (req, res) {
    // console.log("google ",req.body.mail);
    conn.query("select * from user where ( mail='" + req.body.mail + "');", function (err, result) {
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
    // console.log('Mail ', mail);
});

// user name retrieval
app.get('/user_name', (req, res) => {
    conn.query("select fname from user where ( mail='" + userDetails.mail + "');", function (err, result) {
        if (err)
            throw err;
        res.send(result);
    })
});

// user profile 
app.get('/profile', (req, res) => {
    conn.query("select * from user where ( mail='" + userDetails.mail + "');", function (err, result) {
        if (err)
            throw err;
        res.send(result);
    })
})

// Update user details
app.put('/profile_update', (req, res) => {
    conn.query("update user set fname='" + req.body.fname + "', lname='" + req.body.lname + "' , password='" + req.body.password + "'  where mail='" + req.body.mail + "';", function (err, result) {
        if (err)
            throw err;
        res.send(result);
    })
});

// created datetime
let currentTimestamp = {};
const created = new Date();
const formattedDate = created.toLocaleString('en-IN', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
}).replace(',', '');
// console.log(formattedDate);


// user backlog task insertion
app.post("/backlog_task", function (req, res) {
    // console.log(req.body);
    // console.log("user task");
    conn.query("insert into backtask(mail,backtkname, backtkdesc, backtkdate)values('" + userDetails.mail + "','" + req.body.backtkname + "','" + req.body.backtkdesc + "','" + formattedDate + "');", function (err, result) {
        if (err)
            throw err;
        // console.log(result);
    });
    res.send("insert");
})

// user backlog task retrieval
app.get('/backtk_fetch', (req, res) => {
    conn.query("select backtk_id, backtkname, backtkdesc, backtkdate from backtask where ( mail='" + userDetails.mail + "');", function (err, result) {
        if (err)
            throw err;
        // console.log("backlog", result);
        res.send(result);
    })
});

// update backlog task 
app.put('/backlog_update', (req, res) => {
    // console.log(req.body);
    conn.query("update backtask set backtkname='" + req.body.backtkname + "', backtkdesc='" + req.body.backtkdesc + "'  where backtk_id=" + req.body.backtk_id + ";", function (err, result) {
        if (err)
            throw err;
        res.send(result);
    })
});

// delete backlog task
app.delete('/backlog_delete', (req, res) => {
    const backtk_id = req.body.backtk_id;
    conn.query("delete from backtask where backtk_id=" + backtk_id + ";", function (err, result) {
        if (err)
            throw err;
        res.send(result);
    })
});

// user to do task insertion
app.post("/todo_task", function (req, res) {
    // console.log(req.body);
    // console.log("user task");
    conn.query("insert into todotask(mail,todotkname, todotkdesc, todotkdate)values('" + userDetails.mail + "','" + req.body.todotkname + "','" + req.body.todotkdesc + "','" + formattedDate + "');", function (err, result) {
        if (err)
            throw err;
        // console.log(result);
    });
    res.send("insert");
})

// user to do task retrieval
app.get('/todotk_fetch', (req, res) => {
    conn.query("select todo_id, todotkname, todotkdesc, todotkdate from todotask where ( mail='" + userDetails.mail + "');", function (err, result) {
        if (err)
            throw err;
        // console.log("todo", result);
        res.send(result);
    })
});

// update todo task 
app.put('/todo_update', (req, res) => {
    // console.log(req.body);
    conn.query("update todotask set todotkname='" + req.body.todotkname + "', todotkdesc='" + req.body.todotkdesc + "'  where todo_id=" + req.body.todo_id + ";", function (err, result) {
        if (err)
            throw err;
        res.send(result);
    })
});

// delete todo task
app.delete('/todo_delete', (req, res) => {
    const todo_id = req.body.todo_id;
    conn.query("delete from todotask where todo_id=" + todo_id + ";", function (err, result) {
        if (err)
            throw err;
        res.send(result);
    })
});

// user doing task insertion
app.post("/doing_task", function (req, res) {
    // console.log(req.body);
    // console.log("user task");
    conn.query("insert into doingtask(mail,doingtkname, doingtkdesc, doingtkdate)values('" + userDetails.mail + "','" + req.body.doingtkname + "','" + req.body.doingtkdesc + "','" + formattedDate + "');", function (err, result) {
        if (err)
            throw err;
        // console.log(result);
    });
    res.send("insert");
})

// user doing task retrieval
app.get('/doingtk_fetch', (req, res) => {
    conn.query("select doing_id, doingtkname, doingtkdesc, doingtkdate from doingtask where ( mail='" + userDetails.mail + "');", function (err, result) {
        if (err)
            throw err;
        // console.log("doing", result);
        res.send(result);
    })
});

// update doing task 
app.put('/doing_update', (req, res) => {
    // console.log(req.body);
    conn.query("update doingtask set doingtkname='" + req.body.doingtkname + "', doingtkdesc='" + req.body.doingtkdesc + "'  where doing_id=" + req.body.doing_id + ";", function (err, result) {
        if (err)
            throw err;
        res.send(result);
    })
});

// delete doing task 
app.delete('/doing_delete', (req, res) => {
    const doing_id = req.body.doing_id;
    conn.query("delete from doingtask where doing_id=" + doing_id + ";", function (err, result) {
        if (err)
            throw err;
        res.send(result);
    })
});

// user done task insertion
app.post("/done_task", function (req, res) {
    // console.log(req.body);
    // console.log("user task");
    conn.query("insert into donetask(mail,donetkname, donetkdesc, donetkdate)values('" + userDetails.mail + "','" + req.body.donetkname + "','" + req.body.donetkdesc + "','" + formattedDate + "');", function (err, result) {
        if (err)
            throw err;
        // console.log(result);
    });
    res.send("insert");
})

// user done task retrieval
app.get('/donetk_fetch', (req, res) => {
    conn.query("select done_id, donetkname, donetkdesc, donetkdate from donetask where ( mail='" + userDetails.mail + "');", function (err, result) {
        if (err)
            throw err;
        // console.log("done", result);
        res.send(result);
    })
});

// update done task 
app.put('/done_update', (req, res) => {
    // console.log(req.body);
    conn.query("update donetask set donetkname='" + req.body.donetkname + "', donetkdesc='" + req.body.donetkdesc + "'  where done_id=" + req.body.done_id + ";", function (err, result) {
        if (err)
            throw err;
        res.send(result);
    })
});

// delete done task
app.delete('/done_delete', (req, res) => {
    const done_id = req.body.done_id;
    conn.query("delete from donetask where done_id=" + done_id + ";", function (err, result) {
        if (err)
            throw err;
        res.send(result);
    })
});