const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        requires: true
    },
    priority: {
        type: String,
        required: true,
        enum: ["high","medium","low"]
    },
    status: {
        type: Boolean,
        default: false
    },
    userId: {
        type: ObjectId,
        ref: "user"
    }
},{timestamps:true})

module.exports = mongoose.model("task",taskSchema)
