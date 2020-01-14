var express = require('express');
var router = express.Router();

const stickers_controller = require('../controllers/sticker')

/* GET home page. */
router.get('/', stickers_controller.allstickers)
//Form for posting stickers (get)
router.get('/create', stickers_controller.create_get_stickers);
//Form for posting stickers (post)
router.post('/create', stickers_controller.create_post_stickers);


module.exports = router;
