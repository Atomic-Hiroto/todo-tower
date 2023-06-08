const jwt = require("jsonwebtoken")
const {userModel} = require("../models/userModel")

async function getUserFromToken(req,res,next){
    let authHeader = req.headers['authorization']
    if(authHeader){
        let [type,token] = authHeader.split(" ")
        if(type=="Bearer"&&token){
            try {
                let decodedUser = jwt.verify(token,process.env.JWT_SECRET)
                let user = await userModel.findById(decodedUser._id)
                user = await user.toJSON()
                delete user.password
                delete user.taskStack
                req.loggedInUser = user
                next()
                return
            } catch (error) {
                console.log(error)
            }
        }
    }

    return res.status(401).send({
        message: "Not a logged in user"
    })

}


module.exports= {
    getUserFromToken
}