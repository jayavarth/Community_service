const jwt=require('jsonwebtoken');

const Auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader);

    if (!authHeader) {
        return res.status(401).json({ error: "Token required" });
    }
    
    const token = authHeader.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ error: "Token required" });
    }

    try {
        const decoded = jwt.verify(token, "secret_key");
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports=Auth;
