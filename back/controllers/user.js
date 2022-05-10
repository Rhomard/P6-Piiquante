// On importe le modèle pour les users
const User = require("../models/User");

// on importe le package de cryptage de mot de passe
const bcrypt = require("bcrypt");

// Middleware pour l'enregistrement de nouvels utilisateurs
exports.signup = (req, res, next) => {
      // On crypte le mot de passe. On exécute 10 fois l'algorithme de hashage.
      bcrypt.hash(req.body.password, 10)
            // On récupère le hash du mot de passe qu'on enregistre dans un nouvel utilisateur
            .then((hash) => {
                  const user = new User({
                        email: req.body.email,
                        password: hash,
                  });
                  // On enregistre le nouvel utilisateur dans la base de données
                  user.save()
                        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                        .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
};

// Middleware pour connecter des utilisateurs existants
exports.login = (req, res, next) => {
      // On cherche dans la base de données un utilisateur qui à la même adresse mail que celle envoyée dans la requête
      User.findOne({ email: req.body.email })
            .then((user) => {
                  // Si on ne trouve pas l'adresse mail dans la base de données
                  if (!user) {
                        return res.status(401).json({ error: "Utilisateur non trouvé !" });
                  }
                  // Si on trouve une adresse mail correspondante dans la base de donnée, on compare le mot de passe envoyé dans la requête
                  // avec le hash enregistré pour ce user dans la base de données
                  bcrypt.compare(req.body.password, user.password)
                        .then((valid) => {
                              // Si l'utilisateur entre le mauvais mot de passe
                              if (!valid) {
                                    return res.status(401).json({ error: "Mot de passe incorrect !" });
                              }
                              // Si l'utilisateur entre le bon mot de passe
                              res.status(200).json({
                                    userId: user._id,
                                    token: "TOKEN",
                              });
                        })
                        .catch((error) => res.status(500).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
};
