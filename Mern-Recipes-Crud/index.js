import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import recipeRouter from './routes/recipies.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/recipies', recipeRouter);

const PORT = 3000;
const dbURL = process.env.MONGO_URL;
console.log("dbURL:", dbURL);

mongoose.connect(dbURL)
.then( () => console.log('MongoDB successfully Connected!...'))
.catch(err => console.error('MongoDB connection failed!...', err));

app.listen(PORT, () => console.log(`The server is listening on the given URL-PORT https://localhost: ${PORT}`));
