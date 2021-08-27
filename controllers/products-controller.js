const  Product  = require('../model/product')
const {request, response} = require("express");

const getProducts = async (req = request, res = response) => {
    const { limit = 10, from} = req.query;


    const [total, products] = await Promise.all([
        Product.countDocuments({status : true}),
        Product.find({status : true})
            .skip(Number(from))
            .limit(Number(limit))
            .populate('user', 'name')
            .populate('category', 'name')
    ]);

    res.json({
        total,
        products
    })
}


const findProduct = async(req = request, res = response) => {
    const {id} = req.params;
    const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name');
    res.json(product)
}

const postProduct = async(req = request, res = response) => {
    const {_id, status, ...body} = req.body;
    body.name = body.name.toUpperCase();
    body.status = true;
    body.user = req.user._id;
    const product = new Product(body);
    await product.save();
    res.json({
        product
    })
}

const putProduct = async (req = request, res = response) => {
    const {_id, status, ...body} = req.body;
    const {id} = req.params;
    body.name = body.name.toUpperCase();
    body.status = true;
    body.user = req.user._id;
    const product = await Product.findByIdAndUpdate(id, body, {new : true});
    res.json({
        product
    })
}

const deleteProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const userID = req.user._id;
    const product = await Product.findByIdAndUpdate(id, {status : false, user: userID}, {new : true});
    res.json({
        product,
        authUser : req.user
    });
}

module.exports = {
    findProduct,
    postProduct,
    getProducts,
    putProduct,
    deleteProduct
}