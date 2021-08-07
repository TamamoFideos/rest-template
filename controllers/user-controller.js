const User = require('../model/user');
const bcryptjs = require('bcryptjs');

const getUsers = async (req, res) =>{
    const {limit = 10, from} = req.query;

    const [total, users] = await Promise.all([
        User.countDocuments({ state : true}),
        User.find( { state : true})
            .skip(Number(from))
            .limit( Number(limit) )
    ])
    res.json({
        total,
        users
    })
}

const postUsers = async (req, res) => {
    //Error handling

    const {name, password, email, role} = req.body;
    const user = new User({name, password, email, role});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar en bd
    await user.save();
    res.json({
        msg: 'post user - controller',
        user
    })
}

const putUsers = async (req, res) => {
    const {id} = req.params;
    const { _id, role, password, google, email, ...leftovers } = req.body;

    if( password ){
        const salt = bcryptjs.genSaltSync(10);
        leftovers.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, leftovers);
    res.json({
        msg: 'put user- controller',
        user
    })
}

const patchUser = (req, res) => {
    res.json({
        msg: 'patch user- controller'
    })
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id, {state: false})
    res.json({
        user,
        authUser : req.user
    })
}

module.exports = {
    getUsers,
    patchUser,
    putUsers,
    postUsers,
    deleteUser
}