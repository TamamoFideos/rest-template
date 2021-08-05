const User = require('../model/user');
const bcryptjs = require('bcryptjs');
const {generateJWT} = require("../helpers/jws-generator");


const login = async (req, res) => {
    const {email, password} = req.body

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

module.exports = {
    login
}

