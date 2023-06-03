const mongoose = require("mongoose")


function connectDb(){
    mongoose.connect(process.env.DB_URL)
}

module.exports = {
    connectDb
}