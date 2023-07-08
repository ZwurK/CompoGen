const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const ComponentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  framework: { type: String, required: true },
  code: { type: String, required: true },
  prompt: { type: String, required: true },
  likes: {
    type: Number,
    default: 0,
  },
  date: { type: Date, default: Date.now },
});

ComponentSchema.plugin(mongoosePaginate);

const Component = mongoose.model("Component", ComponentSchema);

module.exports = Component;
