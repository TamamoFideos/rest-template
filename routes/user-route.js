//Imports
const { Router } = require('express');
const {check} = require("express-validator");
const router = Router();

//Controller
const {getUsers, postUsers, putUsers, deleteUser, patchUser} = require("../controllers/user-controller");

//Validations and helpers
const {fieldValidator} = require("../middlewares/field-validator");
const {roleValidator, emailValidator, existUserByID} = require("../helpers/db-validators");
const {validateToken} = require("../middlewares/jws-validator");
const {isAdminRole, hasRole} = require("../middlewares/role-validator");




router.get('/', getUsers);

router.post('/', [
    check('email', 'Is not an email!').isEmail(),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required and must have more than 6 letters').not().isEmpty().isLength({min: 6}),
    check('role').custom( roleValidator ),
    check('email').custom( emailValidator ),
    fieldValidator
], postUsers);

router.put('/:id', [
    check('id', 'Is not a Mongo ID').isMongoId(),
    check('id').custom(existUserByID),
    fieldValidator
    ],  putUsers);

router.delete('/:id',[
    validateToken,
    //isAdminRole,
    hasRole('ADMIN_ROLE', 'SELL_ROLE'),
    check('id', 'Is not a Mongo ID').isMongoId(),
    check('id').custom(existUserByID),
    fieldValidator
],  deleteUser);

router.patch('/', patchUser);


module.exports = router;