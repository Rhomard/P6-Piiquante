// On importe express
const express = require("express");

// On importe mongoose
const mongoose = require("mongoose");

// On créé notre app
const app = express();

// On importe le routeur pour les sauces
const sauceRoutes = require("./routes/sauce");

// On importe le routeur pour les users
const userRoutes = require("./routes/user");

app.use(express.json());

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

// On enregistre les routes pour les sauces
app.use("/api/sauce", sauceRoutes);

// On enregistre les routes pour les users
app.use("/api/auth", userRoutes);

// On exporte l'app
module.exports = app;
