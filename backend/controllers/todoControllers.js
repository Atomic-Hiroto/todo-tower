const { userModel } = require("../models/userModel")

async function getTaskStack(user){
    let {taskStack} = await userModel.findById(user._id)
    rearrangeTaskStack(taskStack)
    return taskStack
}

async function addNewTask(task,loggedInUser){
    try {
        const user = await userModel.findById(loggedInUser._id)

        // Check for duplicate task name
        const isDuplicateName = user.taskStack.some((tasks) => tasks.name === task.name);
        if (isDuplicateName) {
            throw new Error("Task with the same name already exists") 
        }

        user.taskStack.push(task)
        await user.save()
        const updatedTaskStack = user.taskStack;
        
        // Rearrange tasks
        rearrangeTaskStack(updatedTaskStack)
        return updatedTaskStack;
    } catch (error) {
        console.error(error);
        throw new Error(error.message)
    }
}


function rearrangeTaskStack(taskStack){
    taskStack.sort((taskA, taskB) => {
        if (taskA.pinned && !taskB.pinned) {
            return -1; // Sort taskA above taskB if taskA is pinned
        }
        if (!taskA.pinned && taskB.pinned) {
        return 1; // Sort taskA below taskB if taskB is pinned
        }
        
        if (taskA.deadline === null && taskB.deadline !== null) {
        return 1; // Sort taskA below taskB if taskA has no deadline
        }
        if (taskA.deadline !== null && taskB.deadline === null) {
        return -1; // Sort taskA above taskB if taskB has no deadline
        }
        if (taskA.deadline === null && taskB.deadline === null) {
        return taskB.priority - taskA.priority; // If both tasks have no deadline, compare priorities
        }

        const deadlineA = new Date(taskA.deadline);
        const deadlineB = new Date(taskB.deadline);
        return deadlineA - deadlineB; // Sort by ascending deadline
    });
    return taskStack
}

module.exports = {
    getTaskStack,
    addNewTask
}