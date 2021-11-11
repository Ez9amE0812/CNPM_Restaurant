//importing packages
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

//firebase admin setup
let serviceAccount = require("./cnpm-c279c-firebase-adminsdk-tfyf7-b7740f6747.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

// declare static path
let staticPath = path.join(__dirname, "foodee");


//intializing express.js

const app = express();

// middlewares
app.use(express.static(staticPath));
app.use(express.json());

//routers

//signup route
app.get('/signup',(req,res)=>{
    res.sendFile(path.join(staticPath,"signup.html"))
})

app.post('/signup', (req,res) =>{
    let {name, email, password,number} = req.body;
    //form validations
    if(name.length < 3){
        return res.json({'alert': 'name must be 3 letters long'});
    } else if(!email.length){
        return res.json({'alert': 'enter your mail'});
    } else if(password.length < 6){
        return res.json({'alert': 'password should be 8 letters long'});
    } else if(!number.length){
        return res.json({'alert': 'enter your phone number'});
    } else if(!Number(number) || number.length < 10){
        return res.json({'alert': 'invalid number, please enter valid one'});
    }

    //store user in db
    db.collection('users').doc(email).get()
    .then(user => {
        if(user.exists){
            return res.json({'alert' : 'email already exists'});
        } else {
            bcrypt.genSalt(10,(err, salt)=>{
               bcrypt.hash(password, salt, (err, hash)=>{
                   req.body.password = hash;
                   db.collection('users').doc(email).set(req.body)
                   .then(data => {
                       res.json({
                           name: req.body.name,
                           email: req.body.email,
                           seller: req.body.seller,
                       })
                   })
               })
            })
        }
    })
})


//login router
app.get('/login', (req,res) => {
    res.sendFile(path.join(staticPath, "Login.html"));
})

app.post('/login', (req,res)=>{
    let{email,password} = req.body;

    if(!email.length || !password.length){
        return res.json({'alert' : 'fill your account'});
    }
    db.collection('users').doc(email).get()
    .then(user => {
        if(!user.exists){
            return res.json({'alert': 'log in email does not exists'})
        } else{
            bcrypt.compare(password, user.data().password, (err, result)=>{
                if(result){
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller,
                    })
                } else{
                    return res.json({'alert': 'password in incorrect'});
                }
            })
        }
    })
})

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