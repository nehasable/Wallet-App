const express = require("express");
const router=express.Router()
const {Account}=require("../db");
const mongoose=require("mongoose")
const {authMiddleware}=require("../middleware")

router.get("/balance",authMiddleware , async function(req,res){                 //get intial balance in user acc           
    //find user based on userid
 

    try {
        const account = await Account.findOne({ 
            userId:req.userId});
            // console.log(account)

            
        if (!account) {
            return res.status(404).json({ error: "Account not found" });
        }
        
        res.json({ balance:account.balance }); 
    } catch (error) {
        console.error("Error fetching account balance:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post("/transfer", authMiddleware , async function(req, res){              //transfer money   
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    console.log(req.body)
    // fetch account using userId
    const account = await Account.findOne({ userId: to }).session(session);
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
    { $inc: { balance: +amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

module.exports=router