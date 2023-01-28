const taskModel = require("../models/taskModel")
const validation = require("../validations/validation")

const createTask = async (req,res)=> {
    try {
        let data = req.body
        let { title, description, priority} = data

        if (validation.isValidBody(data)) return res.status(400).send({ status: false, msg: "Provide all required  details" })

        if (!validation.isValid(title)) return res.status(400).send({ status: false, message: "title is required" })

        if (!validation.isValid(description)) return res.status(400).send({ status: false, message: "description is required" })

        if (!validation.isValid(priority)) return res.status(400).send({ status: false, message: "priority is required" })
        if(!(["high","medium","low"].includes(data.priority))) return res.status(400).send({status:false, message: "Priority should only contain high medium low"})
        data.userId = req.decodedToken.userId

        let createTask = await taskModel.create(data)
        res.status(201).send({ status: true,message: "Successfully created", data: createTask })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


const getTask = async(req,res)=> {
    try {
        const userId = req.decodedToken.userId
        let getTask = await taskModel.find({status:false,userId:userId})
        res.status(200).send({status:true,data:getTask})

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const updateTask = async(req,res)=> {
    try {
        let data = req.body
        let taskId = req.params.taskId

        if (validation.isValidBody(data)) return res.status(400).send({ status: false, msg: "Provide all required  details" })

        if(data.priority) {
            if(!(["high","medium","low"].includes(data.priority))) return res.status(400).send({status:false, message: "Priority should only contain high medium low"})
        }
        let updateTask = await taskModel.findOneAndUpdate({_id:taskId},{...data},{new:true})
        res.status(200).send({status:true,message:"successfully Updated",data:updateTask})

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const deleteTask = async(req,res)=> {
    try {
        let taskId = req.params.taskId
        await taskModel.findOneAndUpdate({_id:taskId},{status:true})
        res.status(200).send({status:true,message:"successfully deleted"})

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = {createTask,getTask,updateTask,deleteTask}