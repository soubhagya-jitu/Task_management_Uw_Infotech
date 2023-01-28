const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    confirmPassword: {
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps:true})

module.exports = mongoose.model("user",userSchema)