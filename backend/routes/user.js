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
router.post("/signup", async (req, res) => {                //send user details

    const { success } = signupSchema.safeParse(req.body)             //check user already exists
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

    const user = await User.create({          //delcare zod object for new user 
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
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
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
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
// Find users by ID or display list of all users
router.get("/bulk", async (req, res) => {
    try {
        const filter = req.query.filter;

        if (filter) {
            // Find users by filter
            const users = await User.find({
                $or: [
                    { firstname: { $regex: filter, $options: 'i' } },
                    { lastname: { $regex: filter, $options: 'i' } }
                
                ]
            });
            res.json({ usersvar: users });
        } else {
            // Display list of all users
            const data = await User.find({});
            res.json({users:data} );
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
});


module.exports=router