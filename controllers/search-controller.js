const {request, response} = require("express");
const {ObjectId} = require('mongoose').Types;
const User = require('../model/user');
const Product = require('../model/product');
const Category = require('../model/category');

const collectionAllowed = [
    'USERS',
    'CATEGORIES',
    'PRODUCTS',
    'ROLES'
]

const searchUsers = async (term = '', res = response) => {
    const isMongoId =  ObjectId.isValid(term);
    if(isMongoId){
        const user = await User.findById(term)
        return res.json({
            results : (user) ? [user] : []
        });
    }
    const regex = RegExp(term, 'i')

    const users = await User.find({
        $or : [{name : regex}, {email : regex}],
        $and : [{state : true}]
    });

    return res.json({
        results : users
    });
}

const searchCategories = async (term = '', res = response) => {
    const isMongoId =  ObjectId.isValid(term);
    if(isMongoId){
        const category = await Category.findById(term)
        return res.json({
            results : (category) ? [category] : []
        });
    }
    const regex = RegExp(term, 'i')

    const categories = await Category.find({
        name : regex,
        status : true
    })
    .populate('user', 'name');
    return res.json({
        results : categories
    });
}

const searchProducts = async (term = '', res = response) => {
    const isMongoId =  ObjectId.isValid(term);
    if(isMongoId){
        const product = await Product.findById(term)
        return res.json({
            results : (product) ? [product] : []
        });
    }
    const regex = RegExp(term, 'i')

    const products = await Product.find({
        name : regex,
        status : true
    })
    .populate('user', 'name')
    .populate('category', 'name');
    return res.json({
        results : products
    });
}

const search = async (req = request, res = response) => {
    const { collection, term } = req.params;
    if(!collectionAllowed.includes(collection.toUpperCase())){
        res.status(400).json({
            msg: `Collections allowed are ${collectionAllowed}`
        })
    }
    switch(collection.toUpperCase()){
        case 'USERS':
            await searchUsers(term, res);
            break
        case 'CATEGORIES':
            await searchCategories(term, res);
            break
        case 'PRODUCTS':
            await searchProducts(term, res);
            break
        default:
            res.status(500).json({
                msg: 'Internal server error'
            })
    }

}

module.exports = {
    search,
}