const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let FestivalSchema = new Schema({
  festivalName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Festival", FestivalSchema);
