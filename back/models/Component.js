const mongoose = require("mongoose");

const ComponentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  framework: { type: String, required: true },
  code: { type: String, required: true },
  likes: {
    type: Number,
    default: 0,
  },
  date: { type: Date, default: Date.now },
});

const Component = mongoose.model("Component", ComponentSchema);

module.exports = Component;
