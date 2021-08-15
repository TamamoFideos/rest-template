const { Router } = require('express');
const {check} = require("express-validator");
const {login, googleSignIn} = require("../controllers/auth-controller");
const {fieldValidator} = require("../middlewares/field-validator");


const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldValidator
], login )

router.post('/google', [
    check('id_token', 'Token is required').not().isEmpty(),
    fieldValidator
], googleSignIn)


module.exports = router;