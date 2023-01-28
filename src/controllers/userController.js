const userModel = require("../models/userModel")
const validation = require("../validations/validation")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    try {
        let data = req.body;
        let { fullName, email, password,confirmPassword } = data

        if (validation.isValidBody(data)) return res.status(400).send({ status: false, msg: "Provide all required  details" })

        if (!validation.isValid(fullName)) return res.status(400).send({ status: false, message: "fullName is required" })
        if (!validation.isValidName(fullName)) return res.status(400).send({ status: false, message: "Not a valid fullName" })

        if (!validation.isValid(email)) return res.status(400).send({ status: false, message: "email is required" })
        if (!validation.isValidEmail(email)) return res.status(400).send({ status: false, message: "email is not valid" })
        let checkEmail = await userModel.findOne({ email: email })
        if (checkEmail) return res.status(409).send({ status: false, msg: "This email is already used" })
        data.email=email.toLowerCase()

        if (!validation.isValid(password)) return res.status(400).send({ status: false, message: "Password is required" })
        if (!validation.isValidPwd(password)) return res.status(400).send({ status: false, message: "Password length should be 8 to 15 characters with atleast one uppercase , number and special character" })

        if (!validation.isValid(confirmPassword)) return res.status(400).send({ status: false, message: "confirmPassword is required" })
        if(password!=confirmPassword) return res.status(400).send({ status: false, message: "Password and confirmPassword should match" })

        const saltRounds = 10
        const hash = bcrypt.hashSync(password, saltRounds)
        data.password = hash

        let createUser = await userModel.create(data)
        res.status(201).send({ status: true,message: "Successfully created", data:createUser })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const loginUser = async function (req, res) {
    try {
      let data = req.body
      let { email, password } = data

      if (validation.isValidBody(data)) return res.status(400).send({ status: false, msg: "provide all  details to login" })
  
      if (!validation.isValid(email)) return res.status(400).send({ status: false, message: "email is required" })
      email=email.toLowerCase()

      if (!validation.isValid(password)) return res.status(400).send({ status: false, message: "Pasworrd is required" })
  
      let findUser = await userModel.findOne({ email: email })
      if (!findUser) return res.status(400).send({ status: false, message: "The email-id is wrong" })
  
      let bcryptPass = await bcrypt.compare(password, findUser.password)
      if (!bcryptPass) return res.status(400).send({ status: false, message: "Password incorrect" })
  
      let token = jwt.sign({ userId: findUser._id }, "Task_Management_Uw_Infotech", { expiresIn: '1d' });
  
      res.status(200).send({ status: true, message: "User login successfully", data: { userId: findUser._id, token: token } })
  
  
    } catch (error) {
      res.status(500).send({ status:false, error: error.message })
    }
  }


module.exports = {createUser,loginUser}