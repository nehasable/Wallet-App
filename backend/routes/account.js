const express = require("express");
const router=express.Router()
const {Account}=require("../db");
const mongoose=require("mongoose")
const {authMiddleware}=require("../middleware")

router.get("/balance",authMiddleware , async function(req,res){                 //get intial balance in user acc           
    //Find user based on userid logged from middleware
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
//Money transfer
router.post("/transfer" , async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to, from } = req.body;
  
    try {
        // Fetch sender's account
        const senderAccount = await Account.findOne({ userId: from }).session(session);
        console.log('Sender ID:', req.userId);
  
        if (!senderAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Sender account not found" });
        }
  
        // Fetch receiver's account
        const receiverAccount = await Account.findOne({ userId: to }).session(session);
  
        if (!receiverAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Receiver account not found" });
        }
  
        // Check if sender has enough balance
        if (senderAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }
  
        // Update sender's balance
        await Account.updateOne(
            { userId: from},
            { $inc: { balance: -amount } }
        ).session(session);
  
        // Update receiver's balance
        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } }
        ).session(session);
  
        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
  
        res.json({ message: "Transfer successful" });
    } catch (error) {
        console.error("Error transferring money:", error);
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports=router