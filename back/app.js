// On importe express
const express = require("express");

// On importe mongoose
const mongoose = require("mongoose");

// On créé notre app
const app = express();

// Connexion avec la base de données
mongoose
      .connect("mongodb+srv://Rhomard:mdpdatabase@piiquante-cluster.zee9n.mongodb.net/Piiquante?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
      })
      .then(() => console.log("Connexion à MongoDB réussie !"))
      .catch(() => console.log("Connexion à MongoDB échouée !"));

// Middleware qui résout les erreurs de CORS
app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
      next();
});

// On exporte l'app
module.exports = app;
