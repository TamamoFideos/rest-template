const Role = require("../model/role");
const User = require("../model/user");


const roleValidator = async (role = '') => {
    //Search for a role that is included in the db
    const existRole = await Role.findOne({role});
    if(!existRole){
        throw new Error(`Role '${role}' is not a valid role!`)
    }
}

const emailValidator = async (email = '') => {
    //Find and email in db to check if its on use
    const emailUsed = await User.findOne({email});
    if(emailUsed){
        throw new Error(`Email '${email}' is already on use!`);
    }
}

const existUserByID = async (id = '') => {
    //Find and email in db to check if its on use
    const existID = await User.findById(id)
    if(!existID){
        throw new Error(`ID '${id}' does not exist!`);
    }
}


module.exports = {
    roleValidator,
    emailValidator,
    existUserByID
}