const {getUsers, postUsers, putUsers, deleteUser, patchUser} = require("../controllers/user-controller");
const { Router } = require('express');
const {check} = require("express-validator");
const {fieldValidator} = require("../middlewares/field-validator");
const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('email', 'Is not an email!').isEmail(),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required and must have more than 6 letters').not().isEmpty().isLength({min: 6}),
    check('name', 'Name is required').not().isEmpty(),
    check('role', 'Is not a role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    fieldValidator
], postUsers);

router.put('/:id',  putUsers);

router.delete('/',  deleteUser);

router.patch('/', patchUser);

module.exports = router;