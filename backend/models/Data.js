const mongoose = require("mongoose");
const { Schema } = mongoose;

const dbSchema = new Schema({
  id: Number,
  title: {
    type:String,
    index: true,
  },
  price: {
    type:Number,
    index: true,
  },
  description: {
    type:String,
    index: true,
  },
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: String,
});

dbSchema.index({title: 'text', description: 'text'});

module.exports = mongoose.model("data", dbSchema);
