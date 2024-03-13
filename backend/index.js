const express = require("express");
const mongoose=require("mongoose")
const cors=require("cors")
const mainRouter=require("./routes/index")
const app= express()
const jwt=require("jsonwebtoken")

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/wallet")
app.use("/api/v1",mainRouter)  //intializes use of Router with url

app.listen("3000",function(err){
    if(err)console.log(err)
    console.log("Server is running on 3000")
})