const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  likedComponents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component'
  }],
  generatedComponents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component'
  }],
  numberGeneration: {
    type: Number,
    default: 0,
  },
  apiKey: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
