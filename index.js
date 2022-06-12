const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
require('dotenv').config();
const port=process.env.PORT||3000;

const app= express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({
    extended:true
}));

app.get("/",function(req,res){
    res.render("home")
})
app.get("/subscribe",function(req,res){
    res.send("<h1>subscribed successfully</h1>")
})
//database connection
const DB ="mongodb+srv://admin:admin123@cluster0.mrbwo.mongodb.net/book_store?retryWrites=true&w=majority"
mongoose.connect(DB 
 ).then(()=>{
    console.log("connection successfull");
}).catch((err)=>console.log(err));

const userSchema =new mongoose.Schema({
    email:String,
    password:String
    
});
const addproducts =new mongoose.Schema({

email:String
    
});

const User = new mongoose.model("user",userSchema);
const Addproducts = new mongoose.model("products",addproducts);

app.post("/register",function(req,res){
    const newUser = new User({
        email:req.body.email,
        password:req.body.password
    });
    newUser.save(function(err)
    {
        if(err)
        {
            console.log(err);
            res.redirect("error");
        }
        else{
            console.log(newUser);
            res.render("home");
        }
    })
})
app.post("/subscribe",function(req,res){


        const product = new Addproducts({
            email:req.body.email
    
            
        });
        product.save(function(err)
        {
            if(err)
            {
                console.log(err);
                res.redirect("error");
            }
           
            else {
                
                Addproducts.find({},function(err,found)
              {  if(err)
                {
                  res.render("error")
                }
                else
                {
                console.log(found);
                 res.send("<h1>subscribed<h1>");
                
                }
            });
              
            }
           
        })
    })
    

app.listen(port,()=> 
console.log("server run on port at http://localhost:3000"));

