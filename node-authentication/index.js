import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/authentication', authentication);

const PORT = 4000;
const dbURL = process.env.MONGO_URL;

console.log('DBURL: ', dbURL);

mongoose.connect(dbURL)
.then( () => console.log('MongoDB successfully connected!...'))
.catch(err => console.error(err.message));

// Protected the routes for middleware
app.use('/', (req, res) => {
    res.send({message: 'Welcome to the node authentication home page!'});
});

app.use('/api/protected', authmiddleware, (req, res) => {
    res.send({message: `Hello user ${req.user}, this is a protected route`});
});


app.listen(PORT, () => console.log(`The server is running on the given PORT... ${PORT}`));

