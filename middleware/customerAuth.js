const jwt = require("jsonwebtoken");

const Login = require("../models/Login");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    res.loginData = decoded;

    
    Login.find({ email: decoded.email })
      .exec()
      .then((data) => {
        if (data[0].role !== "customer") {
          return res.status(401).json({ message: "Unauthorized" });
        }
      });

    next();
  } catch (err) {
    res.status(403).json({
      message: "Unauthenticated",
    });
  }
};
