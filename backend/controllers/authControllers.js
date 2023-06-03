const {userModel} = require("../models/userModel")
const {hashSync} = require("bcryptjs")




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
    registerUser
}