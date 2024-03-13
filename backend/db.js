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
const accountSchema=new mongoose.Schema({
    userrId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
const User= mongoose.model("User",userSchema)
const Account= mongoose.model("Account",accountSchema)
module.exports={
    User,
    Account

}