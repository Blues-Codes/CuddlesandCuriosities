var express = require('express');
var router = express.Router();

/* GET home page. */
const { isLoggedIn } = require('../middleware/route-guard');
const Pattern = require('../models/Pattern.model');

router.get('/amigurumi', (req, res, next) => {
  
    Amigurumi.find()
    .populate('creator')
    .then((foundAmigurumi) => {
        res.render('amigurumi/amigurumi.hbs', { foundAmigurumi });
    })
    .catch((err) => {
        console.log(err)
    })

});


router.get('/create-amigurumi', isLoggedIn, (req, res, next) => {
  res.render('amigurumi/create-amigurumi.hbs');
});

router.post('/create-amigurumi', isLoggedIn, (req, res, next) => {

    const { name, description, imageUrl } = req.body

    Amigurumi.create({
        name,
        description,
        imageUrl,
        owner: req.session.user._id
    })
    .then((createdAmigurumi) => {
        console.log(createdAmigurumi)
        res.redirect('/amigurumi/Amigurumi')
    })
    .catch((err) => {
        console.log(err)
    })

})

router.get('/details/:id', (req, res, next) => {

    Amigurumi.findById(req.params.id)
    .populate('owner')
    .then((foundAmigurumi) => {
        res.render('members/amigurmi-details.hbs', foundAmigurumi)
    })
    .catch((err) => {
        console.log(err)
    })

})

module.exports = router;