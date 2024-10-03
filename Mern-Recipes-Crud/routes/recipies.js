import express from 'express';
import Recipe from '../models/recipe.js';
const recipeRouter = express.Router();

recipeRouter.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        if (!recipes) return res.status(404).json({ message: 'No recipes found' });

        res.status(200).json({ message: 'Recipes fetched successfully', recipes });
        console.log(recipes);
    } catch (error) {
        console.error(error.message);  
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


recipeRouter.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: `Recipe with ID ${req.params.id} not found` });

        res.status(200).json({ message: 'Recipe fetched successfully', recipe });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


recipeRouter.post('/', async (req, res) => {
    console.log(req.body);  // Log the request body
    try {
        const { name, ingredients, cookChef } = req.body;
        
        if (!name || !ingredients || !cookChef) {
            return res.status(400).json({ message: 'Please provide name, ingredients, and cookChef' });
        }

        const newRecipe = new Recipe({ name, ingredients, cookChef });
        await newRecipe.save();
        res.status(201).json({ message: 'Recipe created successfully', newRecipe });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});




recipeRouter.put('/:id', async (req, res) => {
    try {
        const { name, ingredients, cookChef } = req.body; 
        let recipe = await Recipe.findById(req.params.id);  

        if (!recipe) return res.status(404).json({ message: `Recipe with ID ${req.params.id} not found` });

        recipe.name = name || recipe.name;
        recipe.ingredients = ingredients || recipe.ingredients;
        recipe.cookChef = cookChef || recipe.cookChef;

        console.log("Changed Recipe: ", recipe);
        const updatedRecipe = await recipe.save();

        res.status(200).json({ message: 'Recipe updated successfully', updatedRecipe });
        console.log(updatedRecipe);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



recipeRouter.delete('/api/recipies/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe deleted successfully', recipe });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


export default recipeRouter;





