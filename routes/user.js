const {getUsers, postUsers, putUsers, deleteUser, patchUser} = require("../controllers/user-controller");
const { Router } = require('express');
const router = Router();

router.get('/', getUsers);

router.post('/',  postUsers);

router.put('/:id',  putUsers);

router.delete('/',  deleteUser);

router.patch('/', patchUser);

module.exports = router;