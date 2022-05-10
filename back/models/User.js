// On importe mongoose
const mongoose = require("mongoose");

// On importe moogoose unique validator pour éviter des erreurs illisibles de la part de MongoDB
const uniqueValidator = require("mongoose-unique-validator");

// On créé le schéma de données pour les utilisateurs
const userSchema = mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
});

// On applique la validator au schéma avant d'en faire un modèle
userSchema.plugin(uniqueValidator);

// On exporte le schéma sous forme de modèle
module.exports = mongoose.model("User", userSchema);
