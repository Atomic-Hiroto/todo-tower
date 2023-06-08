const express = require("express")
const { registerUser, fetchUser } = require("../controllers/authControllers")
const { getUserFromToken } = require("../middlewares/authMiddleware")

const loginRoute = express.Router()

loginRoute.post("/",async (req,res)=>{
    try {
        let regDetails = req.body
        let data = await fetchUser(regDetails)
        res.send(data)
    } catch (error) {
        console.log(error)
        switch (error.message) {
            case "username not found":
                res.status(400).send("User not registered")
                break;
            case "wrong password entered":
                res.status(400).send("Wrong Password")    
                break;
            default:
                res.status(500).send("Something went wrong")   
                break;
        }
    }
})

loginRoute.post("/loggedIn",getUserFromToken,(req,res)=>{
    try {
        let {loggedInUser} = req;
        return res.send({
            data: loggedInUser
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: err.message
        });
    }
}) 

loginRoute.post("/newuser",async (req,res)=>{
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