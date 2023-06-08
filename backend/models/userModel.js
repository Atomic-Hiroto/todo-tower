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
        type: [
          {
            name: { type: String, required: true},
            priority: { type: Number, required: true },
            deadline: { type: Date, default:null },
            pinned: { type: Boolean, default: false },
          },
        ],
        default: [],
      }
})

const userModel = mongoose.model("User",userSchema,"users")

module.exports = {
    userModel
}