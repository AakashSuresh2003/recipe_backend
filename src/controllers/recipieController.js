const Recipe = require("../models/recipieModel");

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addRecipe = async (req, res) => {
  try {
    const { recipeId, name, cuisine, category, ingredients, chef, status } =
      req.body;

    if (!recipeId || !name || !cuisine || !category || !ingredients || !chef) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newRecipe = new Recipe({
      recipeId,
      name,
      cuisine,
      category,
      ingredients,
      chef,
      status,
    });

    await newRecipe.save();
    res
      .status(201)
      .json({ message: "Recipe added successfully!", recipe: newRecipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchRecipes = async (req, res) => {
  try {
    const { name, cuisine, ingredient } = req.query;

    const query = {};
    if (name) query.name = { $regex: name, $options: "i" };
    if (cuisine) query.cuisine = { $regex: cuisine, $options: "i" };
    if (ingredient) query.ingredients = { $regex: ingredient, $options: "i" };

    const recipes = await Recipe.find(query);

    if (recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found." });
    }

    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const updatedData = req.body;

  try {
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { recipeId },
      updatedData,
      { new: true, runValidators: true } 
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe", error });
  }
};

exports.deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const deletedRecipe = await Recipe.findOneAndDelete({ recipeId });

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({
      message: "Recipe deleted successfully",
      recipe: deletedRecipe,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe", error });
  }
};
