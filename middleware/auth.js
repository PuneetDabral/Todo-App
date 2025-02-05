import jwt from 'jsonwebtoken';

export const verifyToken = (handler) => {
  return async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;  // Attach user info to the request
      return handler(req, res); // Pass control to the actual handler
    } catch (error) {
      console.error('JWT Verification Error:', error);
      return res.status(403).json({ message: 'Invalid token' });
    }
  };
};
