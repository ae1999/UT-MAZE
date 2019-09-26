const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  sID: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  field: {
    type: String,
    required: true
  },
  answerdQuestions: [],
  currentQuestions: [],
  gifts: []
});

module.exports = User = mongoose.model('users', UserSchema);