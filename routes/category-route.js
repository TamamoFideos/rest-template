//----------------------------------------- Require ------------------------------------------------------------
const { Router } = require('express');
const {check} = require("express-validator");
const router = Router();


//-----------------------------------------Middlewares for the router --------------------------------------------
const {fieldValidator} = require("../middlewares/field-validator");
const {validateToken} = require("../middlewares/jws-validator");
const {getCategories, createCategory, findCategory, updateCategory, deleteCategory} = require("../controllers/categories-controller");
const {existCategoryByID, existCategoryName} = require("../helpers/db-validators");
const {isAdminRole} = require("../middlewares/role-validator");


router.get('/', getCategories);

router.get('/:id',[
    check('id', 'Is not a Mongo ID').isMongoId(),
    check('id').custom(existCategoryByID),
    fieldValidator
], findCategory);

router.post('/',[
    validateToken,
    check('name', 'Name is required').not().isEmpty(),
    fieldValidator
],  createCategory);

router.put('/:id',[
    validateToken,
    check('id', 'Is not a Mongo ID').isMongoId(),
    check('name', 'Name is required'),
    check('name').custom(existCategoryName),
    check('id').custom(existCategoryByID),
    fieldValidator,
], updateCategory);

router.delete('/:id', [
    validateToken,
    isAdminRole,
    check('id', 'Is not a Mongo ID').isMongoId(),
    check('id').custom(existCategoryByID),
    fieldValidator
],deleteCategory);

module.exports = router;