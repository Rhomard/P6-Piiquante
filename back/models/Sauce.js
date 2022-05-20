// On importe mongoose
const mongoose = require("mongoose");

// On créé le schéma de données pour les sauces
const sauceSchema = mongoose.Schema({
      userId: { type: String, required: true },
      name: { type: String, required: true },
      manufacturer: { type: String, required: true },
      description: { type: String, required: true },
      mainPepper: { type: String, required: true },
      imageUrl: { type: String, required: true },
      heat: { type: Number, required: true },
      likes: { type: Number, required: true, default: 0 },
      dislikes: { type: Number, required: true, default: 0 },
      usersLiked: { type: Array, required: true, default: [] },
      usersDisliked: { type: Array, required: true, default: [] },
});

// On exporte le schéma sous forme de modèle
module.exports = mongoose.model("Sauce", sauceSchema);
