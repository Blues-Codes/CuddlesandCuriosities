var express = require('express');
var router = express.Router();

/* GET home page. */
const { isLoggedIn } = require('../middleware/route-guard');
const Clothing = require('../models/Clothing.model');

router.get('/clothing', (req, res, next) => {
  
    Clothing.find()
    .populate('creator')
    .then((foundClothing) => {
        res.render('Clothing/Clothing.hbs', { foundClothing });
    })
    .catch((err) => {
        console.log(err)
    })

});


router.get('/create-Clothing', isLoggedIn, (req, res, next) => {
  res.render('Clothing/create-Clothing.hbs');
});

router.post('/create-Clothing', isLoggedIn, (req, res, next) => {

    const { name, description, imageUrl } = req.body

    Clothing.create({
        name,
        description,
        imageUrl,
        owner: req.session.user._id
    })
    .then((createdClothing) => {
        console.log(createdClothing)
        res.redirect('/Clothing/Clothing')
    })
    .catch((err) => {
        console.log(err)
    })

})

router.get('/details/:id', (req, res, next) => {

    Clothing.findById(req.params.id)
    .populate('owner')
    .then((foundClothing) => {
        res.render('members/clothing-details.hbs', foundClothing)
    })
    .catch((err) => {
        console.log(err)
    })

})

module.exports = router;
