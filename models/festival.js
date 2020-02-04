const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let FestivalSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = Festival = mongoose.model("Festival", FestivalSchema);
