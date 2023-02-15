// var express = require('express');
// var router = express.Router();
// const mongoose = require('mongoose'); 
// const bcryptjs = require('bcryptjs');
// const saltRounds = 10;


// const { isLoggedIn, isLoggedOut, isCreator, isNotCreator} = require('../middleware/route-guard')

// const fileUploader = require('../config-cloudinary/cloudinary.config');
// const Members = require('../models/Members.model');
// const CreatePost = require('../models/CreatePost.model');
// const { isLoggedIn, isLoggedOut, isOwner, isNotOwner} = require('../middleware/route-guard') // calling in middleware
// const upload = require('./');
// const Pattern = require('../models/Pattern.model');

// //ADDING TO DATABASE
// router.get('/createpattern', isLoggedIn, showAddForm);

// router.post('/createpattern', isLoggedIn, fileUploader.single('imageUrl'), addPattern);

// router.get('/allpatterns', showAllResources);

// //EDITING AND DELETING IN DATABASE AND PROFILE
// router.get('/pattern-details/:id', showpatternDetails);
// router.get('/editPattern/:id', isOwner, displayEditPattern);
// router.post('/editPattern/:id', isCreator, fileUploader.single('imageUrl'), editForm);
// router.get('/delete-image/:id', isOwner, deleteimage);

// //FILTERING SEARCH
// router.get('/findpattern', showFindpattern);
// router.post('/findpattern', displayFoundpattern);


// // ADDING PAGES
// function showAddForm (req, res, next) {
//     res.render('members/createpattern.hbs')
// }
// function addPattern(req, res, next) {
//     const { title, level, type, itemsNeeded, yarnType, imageUrl, stitches, creator,  } = req.body
//     Pattern.create({
//         title,
//     level, 
//     type,
//     itemsNeeded,
//     hookNeeded,
//     yarnType,
//     imageUrl: req.file.path,
//     stitches,
//     creator: req.session.user._id,
//     creatorLink,
//     })
//     .then((newPattern) => {
//         console.log(newPattern)
//         res.redirect('/members/allpatterns')
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// }

// //FOR ALL PATTERNS
// function showAllPatterns(req, res, next){
//     Pattern.find()
//     .populate('creator')
//     .then((foundPatterns) => {
//         res.render('members/allPatterns.hbs', { foundPatterns });
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// }
// // FOR PATTERN DETAILS
// function showPatternDetails(req, res, next){
//     Pattern.findById(req.params.id)
//     .populate('creator')
//     .then((foundPattern) => {
//         res.render('members/patternDetails.hbs', foundPatterns)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// }

// // FOR EDITING PATTERNS
// function displayEditPattern(req, res, next){
//     Resource.findById(req.params.id)
//     .then((foundPattern) => {
//         res.render('members/editPattern.hbs', foundPattern)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// }
// function editPattern(req, res, next) {
//     const { title, level, type, itemsNeeded, yarnType, imageUrl, stitches, creator,  } = req.body
//     Pattern.create({
//         title,
//     level, 
//     type,
//     itemsNeeded,
//     hookNeeded,
//     yarnType,
//     imageUrl: req.file.path,
//     stitches,
//     creator: req.session.user._id,
//     creatorLink,
//     },
//         {new: true})
//     .then((updatedPattern) => {
//         console.log(updatedPattern)
//         res.redirect(`/members/patternDetails/${req.params.id}`)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// }
// // FOR DELETING PAGES FROM THE PROFILE

// function deleteImage(req, res, next){
//     image.findByIdAndDelete(req.params.id)
//     .then((confirmation) => {
//         console.log(confirmation)
//         res.redirect('/members/member-profile')
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// }
// //FILTERING FIND
// function showFindPattern(req, res, next) {
//     res.render('resources/findPatterns.hbs')
//   }
  
//   function displayFoundPattern(req, res, next){
//     const { title, level, type, itemsNeeded, yarnType, imageUrl, stitches, creator,  } = req.body
//     if (title || level || type || yarnType){
//         Pattern.find({ 
//             "$and": [
//             {title},
//             {level},
//             {type},
//             {yarnType}
//         ]}  
//     )
//     .then((foundPattern) => {
//         console.log('**** for $and...here is the Pattern I got***', foundPattern)
//         res.render('members/foundPattern.hbs', {foundPattern})
//     })
//     .catch((err) =>{
//         console.log("On line 152", err)
//     })
//     } else {
//         Resource.find({ 
//             "$or": [
//                 {title},
//                 {level},
//                 {type},
//                 {yarnType}
//         ]}
//     )
//     .then((foundPattern) => {
//         console.log('**** for $or...here is the Pattern I got***', foundPattern)
//         res.render('members/foundPattern.hbs', {foundPattern})
//     })
//     .catch((err) =>{
//         console.log("On line 152", err)
//     })
//     } 
// }
 