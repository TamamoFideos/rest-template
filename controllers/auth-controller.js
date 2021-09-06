const User = require('../model/user');
const bcryptjs = require('bcryptjs');
const {generateJWT} = require("../helpers/jws-generator");
const {response} = require("express");
const {googleVerify} = require("../helpers/google-verify");


const login = async (req, res) => {
    const {email, password} = req.body
    console.log('Se hizo el login');
    try {
        //Check if email exist
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: `User with ${email} not found`
            })
        }

        //Check if user is active
        if(user.state === false){
            return res.status(400).json({
                msg: `User with ${email} not found -state`
            })
        }

        //Verify the password
        const correctPassword = bcryptjs.compareSync( password, user.password );
        if(!correctPassword){
            return res.status(400).json({
                msg: `Invalid password`
            })
        }

        //Generate JWT
        const token = await generateJWT(user.id);
        res.json({
            user,
            token
        })
    }catch (e){
        res.status(500).json({
            msg: 'System error',
        })
    }

}

const googleSignIn = async (req = response, res = response) => {

    try {
        const {id_token} = req.body;
        const {email, name, img} = await googleVerify(id_token);
        let user = await User.findOne({email});

        //Create a new user if the user is not registered with that email
        if (!user){
            const data = {
                name,
                email,
                img,
                password: 'shisironBotan',
                google : true
            }
            user = new User(data);
            await user.save();
        }
        //Check if the user is deleted with that email
        if(!user.state){
            return res.status(401).json({
                msg : 'Talk to admin about this issue, user blocked'
            })
        }
        //Generate JWT
        const token = await generateJWT(user.id);
        res.json({
            user,
            token
        })
    } catch (err) {
        res.status(400).json({
            msg: 'Google Token not valid'
        })
    }

}


module.exports = {
    login,
    googleSignIn
}

