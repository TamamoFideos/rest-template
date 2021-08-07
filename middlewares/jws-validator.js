const jwt = require('jsonwebtoken');
const {response, request} = require("express");
const User = require('../model/user');

const validateToken = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if(!token){
        return res.status(400).json({
            msg : 'No token included in request'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PUBLIC_KEY);
        const user = await User.findById(uid);

        if(!user){
            return  res.status(401).json({
                msg : `Invalid Token`
            })
        }

        if(!user.state){
            return  res.status(401).json({
                msg : `User with ${uuid} is not in db`
            })
        }
        req.user = user;
        next();
    } catch (e){
        console.log(e);
        res.status(401).json({
            msg: 'Invalid token'
        })
    }

}

module.exports = {
    validateToken
}