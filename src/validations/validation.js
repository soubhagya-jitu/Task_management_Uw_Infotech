const mongoose = require("mongoose")

const isValid = (value) => {
    if (typeof value === "undefined" || typeof value === "null") return false;
    if (typeof value === "string" && value.trim().length == 0) return false;
    return true;
}
const isValidBody = (reqBody) => {
    return Object.keys(reqBody).length == 0;
}
const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
}
const isValidName = (name) => {
    return /^[a-zA-Z\. ]*$/.test(name)
}
const isValidEmail = (Email) => {
    return /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/.test(Email)
}
const isValidPwd = (Password) => {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(Password)
};

module.exports = {isValid, isValidBody, isValidEmail,isValidPwd, isValidObjectId, isValidName}