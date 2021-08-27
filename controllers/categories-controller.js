const {request, response} = require("express");
const Category = require('../model/category');

const getCategories = async (req = request, res = response) => {
    const {limit = 10, from} = req.query;
    const [categories, total] = await Promise.all([
        //Find categories joined with the user that created the category
        Category.find({status: true})
           .skip(Number(from))
           .limit(Number(limit))
           .populate('user', 'name email role'),
       Category.countDocuments({status : true})
    ]);
    res.json({
        total,
        categories
    });
}

const findCategory = async (req = request, res = response) => {
    const {id} = req.params;
    const category = await Category.findById(id)
        .populate('user', 'name email role');
    res.json(category);
}

const createCategory = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();
    const category = await Category.findOne({name});
    if (category){
        return res.status(400).json({
            msg : `Category '${name}' already exists`
        })
    }
    const data = {
        name,
        status : true,
        user : req.user._id
    }
    const newCategory = new Category(data);

    await newCategory.save();

    res.json(newCategory);
 }

const updateCategory = async (req = request, res = response) => {
    const {status, _id, user, ...data} = req.body;
    const {id} = req.params;

    //Take the id from the logged user by the token
    data.user = req.user._id;
    data.name = data.name.toUpperCase();
    const category = await Category.findByIdAndUpdate(id, data, {new : true});
    res.json(category);
}

const deleteCategory = async (req = request, res = response) => {
    const {id} = req.params;
    const userId = req.user._id;
    const category = await Category.findByIdAndUpdate(id, {status : false, user : userId});
    res.json({
        category,
        authUser : req.user
    });
}

module.exports = {
    getCategories,
    deleteCategory,
    updateCategory,
    createCategory,
    findCategory
}


