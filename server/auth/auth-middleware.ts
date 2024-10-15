import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = "my_cat_name_is_Lora";

function verifyToken(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export default verifyToken;
