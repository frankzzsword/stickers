let Sticker = require("../models/sticker");
let Festival = require("../models/festival");
const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

//type:         GET
//description:  Get all the types Stickers
router.get("/", async (req, res, next) => {
  try {
    sticker = await Sticker.find();
    res.send(sticker);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: "No Stickers have been found" });
  }
});

//type:         GET
//description:  Get stickers from particular festival
router.get("/:festival", async (req, res) => {
  try {
    let festivalName = await Festival.find({
      festivalName: req.params.festival
    });

    let sticker = await Sticker.find({ festival: festivalName._id });
    if (!sticker) {
      return res.status(400).json({ errors: [{ msg: "Festival not found" }] });
    }
    res.json(sticker);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: "no Stickers found" });
  }
});
//type:         POST
//description:  Post and Upload stickers from a particular festival
router.post("/create", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  try {
    let tempFilePath;
    let stickerFile = req.files.stickerFile;

    //get festival id from Festival Schema
    let festival = await Festival.find({ festivalName: req.body.festival });
    if (!festival) {
      return res.status(400).json({ errors: [{ msg: "Festival not found" }] });
    }
    //get the path of the lastest file in the particular festival
    let stickerPath = await Sticker.find({ festival: festival._id })
      .sort({
        _id: -1
      })
      .limit(1);
    if (stickerPath.length > 0) {
      let path = stickerPath[0].filePath;
      let fileNumber = path.match(/(\d)(?=.jpg)/g);
      tempFilePath = `./public/images/festivals/${
        req.body.festival
      }/${fileNumber[0] + 1}.jpg`;
      await stickerFile.mv(tempFilePath);
    } else {
      tempFilePath = `./public/images/festivals/${req.body.festival}/1.jpg`;
      await stickerFile.mv(tempFilePath);
    }

    let sticker = new Sticker({
      festival: festival._id,
      description: req.body.description,
      filePath: tempFilePath
    });
    await sticker.save();
    res.json({ msg: "Sticker Saved" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: "Server Error" });
  }
});

router.post("/upload", async (req, res) => {
  try {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

    res.send("File uploaded!");
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "File didn't upload" });
  }
});

module.exports = router;
