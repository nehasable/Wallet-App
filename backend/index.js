const express = require("express");
const mongoose=require("mongoose")
const cors=require("cors")
const mainRouter=require("./routes/index")
const app= express()
const jwt=require("jsonwebtoken")
require('dotenv').config();

const port = process.env.PORT ;
const dbUrl = process.env.DB_URL;

app.use(cors())
app.use(express.json())
mongoose.connect(dbUrl)
app.use("/api/v1",mainRouter)  //intializes use of Router with url

app.listen(port,function(err){
    if(err)console.log(err)
    console.log("Server is running on 3000")
})