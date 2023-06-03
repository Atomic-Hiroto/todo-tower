const express = require("express")
const { registerUser } = require("../controllers/authControllers")

const loginRoute = express.Router()

loginRoute.post("/",(req,res)=>{
    res.send("Here at login")
})

loginRoute.post("/register",async (req,res)=>{
    try {
        let regDetails = req.body
        let result = await registerUser(regDetails)
        switch (result) {
            case "Username is used":
                res.status(400).send(result)
                break;
            case "Email is already registered":
                res.status(400).send(result)
                break;
            default:
                res.send(result)
                break;
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong")   
    }
})



module.exports= {
    loginRoute
}