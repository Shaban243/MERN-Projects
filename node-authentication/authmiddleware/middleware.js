import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({message: 'Access denied, No token available!'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userid;
        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid Token!'});
    }
}