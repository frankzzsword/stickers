var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StickerSchema = new Schema({
    festivalName: {type: String, required: true, max: 100},
    filePath:{type: String, required: true}
})

module.exports = mongoose.model('Festival', StickerSchema);