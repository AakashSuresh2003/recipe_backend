const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  category: {
    type: String, 
    required: true
  },
  ingredients: {
    type: [String], 
    required: true
  },
  chef: {
    type: String, 
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Unavailable'], // Recipe availability status
    default: 'Available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
