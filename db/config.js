const mongoose = require('mongoose');
require('colors');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log(`Database: ${'ONLINE'.green}`)
    }
    catch (e){
        console.log(e);
        throw new Error('Error initializing the database')
    }
}

module.exports = {
    dbConnection
}