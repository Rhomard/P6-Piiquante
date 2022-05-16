// On importe le modèle pour les sauces
const Sauce = require("../models/Sauce");

// On importe le package fs (file system) de Node
const fs = require("fs");
const { execFileSync } = require("child_process");

exports.createSauce = (req, res, next) => {
      const sauceObject = JSON.parse(req.body.sauce);
      delete sauceObject._id;
      const sauce = new Sauce({
            ...sauceObject,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: [],
      });
      sauce.save()
            .then(() => res.status(201).json({ message: "Objet enregistré !" }))
            .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
      Sauce.findOne({
            _id: req.params.id,
      })
            .then((sauce) => {
                  res.status(200).json(sauce);
            })
            .catch((error) => {
                  res.status(404).json({
                        error: error,
                  });
            });
};

exports.modifySauce = (req, res, next) => {
      Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                  const sauceObject = req.file
                        ? {
                                ...JSON.parse(req.body.sauce),
                                imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
                          }
                        : { ...req.body };
                  const filename = sauce.imageUrl.split("/images/")[1];
                  fs.unlink(`images/${filename}`, () => {
                        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                              .then(() => res.status(200).json({ message: "Objet modifié !" }))
                              .catch((error) => res.status(400).json({ error }));
                  });
            })
            .catch((error) => res.status(500).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
      Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                  const filename = sauce.imageUrl.split("/images/")[1];
                  fs.unlink(`images/${filename}`, () => {
                        Sauce.deleteOne({ _id: req.params.id })
                              .then(() => res.status(200).json({ message: "Objet supprimé !" }))
                              .catch((error) => res.status(400).json({ error }));
                  });
            })
            .catch((error) => res.status(500).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
      Sauce.find()
            .then((sauces) => {
                  res.status(200).json(sauces);
            })
            .catch((error) => {
                  res.status(400).json({
                        error: error,
                  });
            });
};

exports.likeDislike = (req, res, next) => {
      let like = req.body.like;
      let userId = req.body.userId;
      let sauceId = req.params.id;
      Sauce.findOne({ _id: sauceId })
            .then((sauce) => {
                  const valeursQuiChangent = {
                        usersLiked: sauce.usersLiked,
                        usersDisliked: sauce.usersDisliked,
                        likes: 0,
                        dislikes: 0,
                  };
                  if (like == 1) {
                        if (!sauce.usersLiked.includes(userId) && !sauce.usersDisliked.includes(userId)) {
                              valeursQuiChangent.usersLiked.push(userId);
                        }
                  } else if (like == -1) {
                        if (!sauce.usersLiked.includes(userId) && !sauce.usersDisliked.includes(userId)) {
                              valeursQuiChangent.usersDisliked.push(userId);
                        }
                  } else {
                        if (sauce.usersLiked.includes(userId)) {
                              const index = valeursQuiChangent.usersLiked.indexOf(userId);
                              valeursQuiChangent.usersLiked.splice(index, 1);
                        } else if (sauce.usersDisliked.includes(userId)) {
                              const index = valeursQuiChangent.usersDisliked.indexOf(userId);
                              valeursQuiChangent.usersDisliked.splice(index, 1);
                        }
                  }

                  valeursQuiChangent.likes = valeursQuiChangent.usersLiked.length;
                  valeursQuiChangent.dislikes = valeursQuiChangent.usersDisliked.length;

                  Sauce.updateOne({ _id: sauceId }, valeursQuiChangent)
                        .then(() => res.status(200).json({ message: "Action sur le like prise en compte !" }))
                        .catch((error) => res.status(400).json({ error }));
            })

            .catch((error) => res.status(500).json({ error }));
};
