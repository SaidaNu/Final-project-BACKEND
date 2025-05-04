import jwt from "jsonwebtoken";

export function authUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Токен отсутствует!" });
  }

  const token = authHeader.replace(/^Bearer\s/, "");

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin;
    req.name = decoded.name;
    next();
  } catch (error) {
    res.status(401).json({ message: "Невалидный токен" });
  }
}

export function checkIsAdmin(req, res, next) {
  if (req.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: "Нет доступа" });
  }
}
