const {Router, request, response} = require('express');
const {getProducts, postProduct, putProduct, findProduct, deleteProduct} = require("../controllers/products-controller");
const {check} = require("express-validator");
const {validateToken} = require("../middlewares/jws-validator");
const {fieldValidator} = require("../middlewares/field-validator");
const {existCategoryByID, existProductByID} = require("../helpers/db-validators");
const {isAdminRole} = require("../middlewares/role-validator");

const router = Router();

//Get products pageable
router.get('/', getProducts);

//Find product
router.get('/:id', [
    check('id', 'Is not mongo ID').isMongoId(),
    check('id').custom(existProductByID),
    fieldValidator],
    findProduct);

//Create product
router.post('/', [
    validateToken,
    check('name', 'name is required').not().isEmpty(),
    check('category', 'category is required').not().isEmpty(),
    check('category', 'is not a mongo id').isMongoId(),
    check('category').custom(existCategoryByID),
    check('price', 'price is required').not().isEmpty(),
    check('price', 'is not a number').isNumeric(),
    fieldValidator
], postProduct);

//Update product
router.put('/:id',[
    validateToken,
    check('id').isMongoId(),
    check('id').custom(existProductByID),
    check('category', 'is not a mongo id').isMongoId(),
    check('category').custom(existCategoryByID),
    fieldValidator
],putProduct);

//Delete product
router.delete('/:id', [
    validateToken,
    isAdminRole,
    check('id').not().isEmpty(),
    check('id').isMongoId(),
    check('id').custom(existProductByID),
    fieldValidator
], deleteProduct);

module.exports = router

