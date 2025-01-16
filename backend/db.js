const mongoose = require('mongoose');
const url = 'mongodb+srv://vaibhav279neware:Vaibhav%40123456789@table-data.5gz0a.mongodb.net/?retryWrites=true&w=majority&appName=table-data'

const connectToMongo = async() =>{
    try{
        await mongoose.connect(url);
        console.log('db connected.');
    }
    catch(err){
        console.log('Error connecting to Mongo.'+err);
    }
}

module.exports = connectToMongo;