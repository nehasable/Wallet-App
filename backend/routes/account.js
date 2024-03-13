const express = require("express");
const router=express.Router()
const {Account}=require("../db");
const { default: mongoose } = require("mongoose");

router.get("/balance",async function(req,res){                 //get intial balance in user acc           
    //find user based on userid
    const account=await Account.findOne({
        userId:req.userId
    })
    res.json({
        balance:account.balance                          //balance from acc stored in mongodb
    })
})

router.post("/transfer", async function(req, res){              //transfer money   
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;

    // fetch account using userId
    const account = await Account.find({ userId: to }).session(session);
    if (!account) {
        await session.abortTransaction();                   //abort transaction
        return res.status(400).json({
            message: "Invalid Transaction"
        });
    }
    await Account.updateOne({
        userId: req.userId
    },
    { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({
        userId: to
    },
    { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

module.exports=router