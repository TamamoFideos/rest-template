const {request, response} = require("express");


const isAdminRole = ( req = request, res = response, next) => {
    if(!req.user){
        return res.status(500).json({
            msg :'Wants to verify role without validate token'
        });
    }
    const {role, name} = req.user;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg : `User ${name} is not admin`
        });
    }
    next();
}

const hasRole = (...roles) => {

    return  ( req = request, res = response, next) => {
        if(!req.user){
            return res.status(500).json({
                msg :'Wants to verify role without validate token'
            });
        }
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg :`The only roles accepted are: ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}