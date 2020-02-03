const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StickerSchema = new Schema({
  festival: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "festivalName"
  },
  description: {
    type: String,
    required: true,
    max: 100
  },
  filePath: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Sticker", StickerSchema);
