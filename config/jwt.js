import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', 
    });
};


export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
 
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      req.user = decoded;
      next();
    });
  };

