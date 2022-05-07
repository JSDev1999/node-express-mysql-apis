import HttpError from "http-errors";
import multer from "multer";
import imageModel from "../models/imageModel.js";

// storage
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("testimage");

export const uploadImage = async (req, res, next) => {
  try {
    console.log(req);
    await upload(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        imageModel
          .create({ name: req.body.name, image: req?.file?.filename })
          .then((results) => {
            res.status(200).json({
              msg: "image uploaded",
              data: results,
            });
          })
          .catch((err) => {
            throw HttpError.Conflict(err);
          });
      }
    });
  } catch (error) {
    res.status(417).json({
      msg: error.message,
    });
  }
};
