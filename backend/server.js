const express = require("express")
const dotenv = require("dotenv")
const { loginRoute } = require("./routes/loginRoutes")
const { connectDb } = require("./config/database")
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.get("/",(req,res)=>{
    res.send("todo-tower backend API")
})

app.use(express.json())

app.use("/login",loginRoute)
//app.use("/todo",todoRoute)



app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`)
    try {
        connectDb()
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    } 
})