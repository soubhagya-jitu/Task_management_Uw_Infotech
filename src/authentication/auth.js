const jwt = require('jsonwebtoken')
const validation = require("../validations/validation")
const taskModel = require("../models/taskModel")

const authentication = (req, res, next) => {
  try {
    let bearerHeader = req.headers.authorization;
    if (typeof bearerHeader == "undefined") return res.status(400).send({ status: false, message: "Token is missing" });

    let bearerToken = bearerHeader.split(' ')
    let token = bearerToken[1];
    jwt.verify(token, "Task_Management_Uw_Infotech", function (err, data) {
      if (err) {
        return res.status(400).send({ status: false, message: err.message })
      } else {
        req.decodedToken = data;
        next()
      }
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message })
  }
}

const authorization = async (req, res, next) => {
  try {
    let loggedInUser = req.decodedToken.userId
    let taskId = req.params.taskId

    if (!validation.isValidObjectId(taskId)) return res.status(400).send({ status: false, message: "Enter a valid taskId" })

    let findTask = await taskModel.findOne({_id:taskId,isDeleted:false})
    if (!findTask) return res.status(404).send({ status: false, message: "No task found" });

    let loginUser = findTask.userId.toString()

    if (loggedInUser != loginUser) return res.status(403).send({ status: false, message: "Error!! authorization failed" });
    next()
  } catch (err) {
    res.status(500).send({ status: false, error: err.message })
  }
}

module.exports = { authentication,authorization}