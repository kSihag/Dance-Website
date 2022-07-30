const express = require("express");
const path = require("path");
const fs=require("fs")
const app = express();
const port =80;

app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'pug');
app.set('views',path.join(__dirname, 'views'));

app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params) 
});

app.get('/contact',(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params) 
});

app.post('/contact',(req,res)=>{
    name=req.body.name
    phone=req.body.phone
    email=req.body.email
    address=req.body.address
    desc=req.body.desc
    
    let outputToWrite = `The name  is ${name} and contact number is ${phone}, email is ${email}, residing at
     ${address}, and more about him/her is ${desc}`
    fs.writeFileSync('output.txt',outputToWrite)
    const params = {"message":'Form successfully submitted'}
    res.status(200).render('contact.pug',params) 
});

app.get('/class',(req,res)=>{
    const params = {}
    res.status(200).render('class.pug',params) 
});


app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});