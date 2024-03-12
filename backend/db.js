const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:String,
    firstname:String,
    lastname:String,
    password:{
        type:String,
        minLength:8
    }
})
const User= mongoose.model("User",userSchema)
module.exports={
    User
}