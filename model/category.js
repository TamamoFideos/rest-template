const { Schema, model } = require('mongoose');

const categorySchema = Schema({
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
    }
})
categorySchema.methods.toJSON = function () {
    const {__v,state, ...category} = this.toObject();
    return category;
}
module.exports = model('Category', categorySchema)