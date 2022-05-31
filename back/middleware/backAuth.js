// On créé l'accès aux variable du .env
const dotenv = require("dotenv").config();
const secretToken = process.env.SECRET_TOKEN;

// On importe le package jsonwebtoken qui va permettre de créer des tokens et de les vérifier
const jwt = require("jsonwebtoken");

// On importe le modèle pour les sauces
const Sauce = require("../models/Sauce");

module.exports = (req, res, next) => {
      Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                  // Récupération du token d'authentification
                  const token = req.headers.authorization.split(" ")[1];
                  // Décodage du token
                  const decodedToken = jwt.verify(token, secretToken);
                  // Récupération du userId encodé dans le token
                  const userId = decodedToken.userId;

                  // Comparaison du userId de la sauce et celui du token
                  if (sauce.userId && sauce.userId !== userId) {
                        res.status(403).json({ message: "Unauthorized request !" });
                  } else {
                        next();
                  }
            })
            .catch((error) => {
                  res.status(401).json({ error });
            });
};
