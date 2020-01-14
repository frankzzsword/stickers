var Sticker = require('../models/sticker');

exports.allstickers = function(req, res, next) {
    Sticker.find({}, function(err, stickers) {
        if(err) return next(err);
        console.log(stickers);
        res.render('index', { title: 'Festival Stickers', stickers: stickers});
    })
}

exports.create_get_stickers = function(req, res, next) {
    res.render('create', { title: 'Create Stickers' });
};

exports.create_post_stickers = function(req, res, next) {
    var sticker = new Sticker({
        festivalName: req.body.festivalName,
        filePath: req.body.filePath
    });

    sticker.save(function(err) {
            if(err) return next(err);
            res.redirect('/');
    })
    
}