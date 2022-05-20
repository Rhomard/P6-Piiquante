// On créé l'accès aux variable du .env
const dotenv = require("dotenv").config();
const secretToken = process.env.SECRET_TOKEN;

// On importe le package jsonwebtoken qui va permettre de créer des tokens et de les vérifier
const jwt = require("jsonwebtoken");

// On exporte le middleware
module.exports = (req, res, next) => {
      try {
            // On récupère le token dans le header
            const token = req.headers.authorization.split(" ")[1];
            // On décode le token avec notre clé secrète
            const decodedToken = jwt.verify(token, secretToken);
            // On récupère le userId
            const userId = decodedToken.userId;
            // On attribue le userId à l'objet requête
            req.auth = { userId };
            // On vérifie que le userId correspond bien avec celui du token
            if (req.body.userId && req.body.userId !== userId) {
                  throw "Invalid user ID";
            } else {
                  next();
            }
      } catch {
            res.status(401).json({
                  error: new Error("Invalid request!"),
            });
      }
};
