// On importe express
const express = require("express");

// On créé un routeur avec express
const router = express.Router();

// On importe le middleware d'authentification
const auth = require("../middleware/auth");

// On importe le middleware d'authentification pour le back
const backAuth = require("../middleware/backAuth");

// On importe le controller pour les sauces
const sauceCtrl = require("../controllers/sauce");

// On importe le middleware multer
const multer = require("../middleware/multer-config");

router.get("/", auth, sauceCtrl.getAllSauce);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put("/:id", auth, backAuth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, backAuth, sauceCtrl.deleteSauce);

router.post("/:id/like", auth, sauceCtrl.likeDislike);

// On exporte le routeur
module.exports = router;
