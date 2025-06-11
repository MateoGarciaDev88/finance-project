import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "hormiga_culona";

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.status(403).json({ message: "No tienes el token" });
    }

    const token = bearerHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido" });
    }

    req.user = decoded;
    next();
});
}

export default verifyToken;
