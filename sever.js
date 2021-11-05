//importing packages
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

// declare static path
let staticPath = path.join(__dirname, "foodee");


//intializing express.js

const app = express();

// middlewares
app.use(express.static(staticPath));

//routers


//404 router
app.get('/404', (req,res)=>{
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use((req,res)=>{
    res.redirect('/404');
})


//home route
app.get("/", (req, res)=>{
    res.sendFile(path.join(staticPath,"index.html"));
})

app.listen(3001, ()=>{
    console.log('listening on port 3001 .........');
})