import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import router from express.Router();

// Route for registering a new user
router.post('/register', async (req, res) => {
    const {username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if(user) return res.status(400).json({message: "User with given email already exists"});

        user = new User({ username, email, password });
        await User.save();
        console.log(user);

        const payload = {'userId: ': user._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(201).json({ token });
    } catch (error) {
        console.error(err.message);
        res.status(500).json({message: 'server error', error: err.message});
    }
});


// Route for logging an existing user 
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.find({ email });
        if(!user) return res.status(401).send({message: 'Invalid Credentials!'});

       const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).send({message: 'Invalid Credentials!'});

        const payload = {'userId: ': user._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(201).json({ token });
        
    } catch (error) {
        console.error(err.message);
        res.status(500).json({message: 'server error', error: err.message});
    }
});

export default router;