// On importe multer
const multer = require("multer");

// On créé un dictionnaire de mime-types
const MIME_TYPES = {
      "image/jpg": "jpg",
      "image/jpeg": "jpg",
      "image/png": "png",
};

// On créé un objet de config pour multer pour enregistrer un fichier sur un disque
const storage = multer.diskStorage({
      // On règle la destination
      destination: (req, file, callback) => {
            callback(null, "images");
      },
      // On donne le nom de fichier à utiliser
      filename: (req, file, callback) => {
            const name = file.originalname.split(".")[0].split(" ").join("_");
            const extension = MIME_TYPES[file.mimetype];
            callback(null, name + Date.now() + "." + extension);
      },
});

// On exporte notre middleware configuré multer
module.exports = multer({ storage: storage }).single("image");
