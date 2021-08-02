
const getUsers = (req, res) =>{
    const params = req.query;
    res.json({
        msg: 'get user- controller',
        params
    })
}

const postUsers = (req, res) => {
    const user = req.body;

    res.json({
        msg: 'post user - controller',
        user
    })
}

const putUsers = (req, res) => {
    res.json({
        msg: 'put user- controller'
    })
}

const patchUser = (req, res) => {
    res.json({
        msg: 'patch user- controller'
    })
}

const deleteUser = (req, res) => {
    res.json({
        msg: 'delete user - controller'
    })
}

module.exports = {
    getUsers,
    patchUser,
    putUsers,
    postUsers,
    deleteUser
}