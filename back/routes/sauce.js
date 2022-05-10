// On importe express
const express = require("express");

// On créé un routeur avec express
const router = express.Router();

// On importe le middleware d'authentification
const auth = require("../middleware/auth");

// On importe le controller pour les sauces
const sauceCtrl = require("../controllers/sauce");

router.get("/", auth, sauceCtrl.getAllSauce);
router.post("/", auth, sauceCtrl.createSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put("/:id", auth, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);

// On exporte le routeur
module.exports = router;
