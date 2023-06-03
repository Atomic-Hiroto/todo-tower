const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    avatar:{
        type:String
    },
    taskStack: {
        type: Array,
        default: []
    }
})

const userModel = mongoose.model("User",userSchema,"users")

module.exports = {
    userModel
}