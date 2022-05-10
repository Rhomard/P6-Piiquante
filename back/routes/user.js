// On importe express
const express = require("express");

// On créé un routeur avec express
const router = express.Router();

// On importe le controller pour les users
const userCtrl = require("../controllers/user");

// Route POST puisque le frontend va envoyer ces informations
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// On exporte le routeur
module.exports = router;
