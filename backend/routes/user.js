//intialize route for user and logic  
//requests sent will be coded here

const express = require("express");
const router=express.Router()
const zod=require("zod")
const {User, Account}=require("../db")
const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../config");
// const router = require("./index");
const  { authMiddleware } = require("../middleware");

const signupSchema=zod.object({        //declare zod object
    username:zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string().min(8)
})
router.post("/signup", async (req, res) => {

    const { success } = signupSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})
//-------------------------------
const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})
router.post("/signin",async function(req,res){
    const { success } = signinBody.safeParse(req.body)       //check if inputs pass zod validation
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

     const userSignin=await User.findOne({                                                     //find already created user
     username:req.body.username,
     password:req.body.password
     })
     if(userSignin){                                          //hash userid and return it
        const token=jwt.sign({
            userId:User._id
        },JWT_SECRET)
        res.json({
            message:"User signedin",
            token:token
            
        })
     }
     res.status(411).json({
        message: "Error while logging in"
    })
})

//------------------
const userUpdate=zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})
router.put("/",authMiddleware, async function(req,res){
    const {success}=userUpdate.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Error while updating"
        })
    }
    await User.updateOne({_id:req.userId},req.body)
    res.json({
        message:"Updated successfully"
    })
})
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
}) 












module.exports=router