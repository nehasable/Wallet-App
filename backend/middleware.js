
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("./config");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(403).json({})
    }
    const token = authHeader.split(' ')[1]
    console.log(token)
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
      
            req.userId = decoded.userId
            console.log("middleware",req.userId)
            
            next()
        

    }
    catch (err) {
        return res.status(403).json({});
    }
}

module.exports = {
    authMiddleware
}