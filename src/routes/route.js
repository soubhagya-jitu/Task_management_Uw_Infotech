const express = require("express")
const router = express.Router()

const {createUser,loginUser} = require("../controllers/userController")
const {createTask,getTask,updateTask,deleteTask} = require("../controllers/taskController")
const {authentication,authorization} = require("../authentication/auth")

router.post("/register",createUser)
router.post("/login",loginUser)


router.post("/createtask",authentication,createTask)
router.get("/getTask",authentication,getTask)
router.put("/updateTask/:taskId",authentication,authorization,updateTask)
router.delete("/deleteTask/:taskId",authentication,authorization,deleteTask)

module.exports = router