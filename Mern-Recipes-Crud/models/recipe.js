import mongoose from 'mongoose'; 
const { Schema, model } = mongoose;  // Destructure Schema and model from mongoose

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    cookChef: {
        type: String,
        required: true,
    }
});

const Recipe = model('recipe', recipeSchema);

export default Recipe;
