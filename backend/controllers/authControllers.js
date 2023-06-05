const {userModel} = require("../models/userModel")
const {hashSync,compareSync} = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function fetchUser(regDetails){
    let user = await userModel.findOne({username:regDetails.username})
    if(!user){
        throw new Error("username not found")
    }
    if(!compareSync(regDetails.password,user.password)){
        throw new Error("wrong password entered")
    }
    user = await user.toJSON()
    delete user.password
    delete user.taskStack
    let token = jwt.sign(user,process.env.JWT_SECRET)
    return {user,token}
}


async function registerUser(regDetails){
    let uName = await userModel.findOne({username:regDetails.username})
    if(uName){
        return "Username is used"
    }
    let uEmail = await userModel.findOne({email:regDetails.email})
    if(uEmail){
        return "Email is already registered"
    }

    let user = {
        username:regDetails.username,
        password:hashSync(regDetails.password),
        email:regDetails.email
    }

    await userModel.create(user)

    return "User Registered"
}


module.exports = {
    registerUser,
    fetchUser
}