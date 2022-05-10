// On importe express
const express = require("express");

// On créé un routeur avec express
const router = express.Router();

// On importe le controller pour les sauces
const sauceCtrl = require("../controllers/sauce");

router.get("/", sauceCtrl.getAllSauce);
router.post("/", sauceCtrl.createSauce);
router.get("/:id", sauceCtrl.getOneSauce);
router.put("/:id", sauceCtrl.modifySauce);
router.delete("/:id", sauceCtrl.deleteSauce);

// On exporte le routeur
module.exports = router;
