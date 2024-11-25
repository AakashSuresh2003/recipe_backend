const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipieController');

router.get('/recipes', recipeController.getAllRecipes);

router.post('/recipes', recipeController.addRecipe);

router.get('/recipes/search', recipeController.searchRecipes);

module.exports = router;
