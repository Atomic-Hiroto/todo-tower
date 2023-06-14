const express = require("express")
const { getUserFromToken } = require("../middlewares/authMiddleware")
const { getTaskStack, addNewTask, popTask, updateTask } = require("../controllers/todoControllers")

const todoRoute = express.Router()

todoRoute.get("/",getUserFromToken,async (req,res)=>{
    try {
        let {loggedInUser} = req
        let taskStack = await getTaskStack(loggedInUser)
        res.send(taskStack)
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong")
    }
})


todoRoute.post("/add",getUserFromToken,async (req,res)=>{
    try {
        let task = req.body
        let {loggedInUser} = req
        let updatedTaskStack = await addNewTask(task,loggedInUser)
        res.status(201).json({ taskStack: updatedTaskStack })
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

todoRoute.delete("/pop/:id",getUserFromToken,async (req,res)=>{
    try {
        let id = req.params.id
        let {loggedInUser} = req
        let updatedTaskStack = await popTask(id,loggedInUser)
        res.status(201).json({ taskStack: updatedTaskStack })
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

todoRoute.patch("/update",getUserFromToken,async (req,res)=>{
    try {
        let task = req.body
        let {loggedInUser} = req
        let updatedTaskStack = await updateTask(task,loggedInUser)
        res.status(201).json({ taskStack: updatedTaskStack })
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

module.exports = {
    todoRoute
}