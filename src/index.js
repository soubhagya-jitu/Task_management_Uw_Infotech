const express = require("express")
const route = require("./routes/route")
const mongoose = require("mongoose")
const multer = require("multer")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

let upload = multer()
app.use(upload.any())

mongoose.connect("mongodb+srv://manaskumar:iFVJhjYrsH7iars8@cluster0.s4pqkzd.mongodb.net/Task_Management?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use("/", route)

app.listen(3001, () => {
    console.log("app is running on port 3000")
})


