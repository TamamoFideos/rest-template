const {model, Schema} = require('mongoose');

const ProductSchema = Schema({
    name : {
        type : String,
        required : [true, 'Name is required']
    },
    status: {
        type : Boolean.prototype,
        required : [true, 'Status is requiered']
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : [true, 'User is required']
    },
    price : {
        type : Number,
        default : 0,
        required : [true, 'price is required']
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : 'Category',
        required : [true, 'Category is required']
    },
    description : {
        type : String,
    },
    available : {
        type : Boolean,
        default: true
    }
})


ProductSchema.methods.toJSON = function () {
    const {__v,status, ...category} = this.toObject();
    return category;
}
module.exports = model('Product', ProductSchema)