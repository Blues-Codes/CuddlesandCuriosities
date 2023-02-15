var express = require('express');
var router = express.Router();
const mongoose = require('mongoose'); 
const bcryptjs = require('bcryptjs');
const saltRounds = 10;


const { isLoggedIn, isLoggedOut, isCreator, isNotCreator} = require('../middleware/route-guard')

const fileUploader = require('../config-cloudinary/cloudinary.config');
const NewAmigurumi = require('../models/Pattern.model');
const NewClothing = require ('../models/Clothing.model');
const Members = require('../models/Members.model');
const CreatePost = require('../models/CreatePost.model');
const { isLoggedIn, isLoggedOut, isOwner, isNotOwner} = require('../middleware/route-guard') // calling in middleware
const upload = require('./');

//ADDING TO DATABASE
router.get('/add-amigurumi', isLoggedIn, showAddForm);
router.get('/add-clothing', isLoggedIn, showAddForm);
router.post('/add-amigurumi', isLoggedIn, addResource);
router.post('/add-clothing', isLoggedIn, addResource);
router.get('/all-patterns', showAllResources);

//EDITING AND DELETING IN DATABASE AND PROFILE
router.get('/amigurumi-details/:id', showAmigurumiDetails);
router.get('/clothing-details/:id', showClothingDetails);
router.get('/edit-resource/:id', isOwner, displayEditForm);
router.post('/edit-resource/:id', isOwner, editForm);
router.get('/delete-image/:id', isOwner, deleteimage);

//FILTERING SEARCH
router.get('/find-amigurumi', showFindAmigurumi);
router.get('/find-clothing', showFindClothing);
router.post('/find-amigurumi', displayFoundAmigurumi);
router.post('/find-clothing', displayFoundClothing);

// ADDING PAGES
function showAddForm (req, res, next) {
    res.render('members/create-amigurumi.hbs')
}
function addResource(req, res, next) {
    const { name, description, grade, subject,imageUrl } = req.body
    Resource.create({
        name,
        description,
        grade,
        subject,
        imageUrl, //figure out how to add any other kind of file, and how to handle it
        creator: req.session.user._id
    })
    .then((newResource) => {
        console.log(newResource)
        res.redirect('/resources/all-resources')
    })
    .catch((err) => {
        console.log(err)
    })
}

//FOR ALL PATTERNS
function showAllResources(req, res, next){
    Resource.find()
    .populate('creator')
    .then((foundResources) => {
        res.render('resources/allResources.hbs', { foundResources });
    })
    .catch((err) => {
        console.log(err)
    })
}
// FOR PATTERN DETAILS
function showResourceDetails(req, res, next){
    Resource.findById(req.params.id)
    .populate('creator')
    .then((foundResource) => {
        res.render('resources/resourceDetails.hbs', foundResource)
    })
    .catch((err) => {
        console.log(err)
    })
}

// FOR EDITING PROFILE
function displayEditForm(req, res, next){
    Resource.findById(req.params.id)
    .then((foundResource) => {
        res.render('resources/editResource.hbs', foundResource)
    })
    .catch((err) => {
        console.log(err)
    })
}
function editForm(req, res, next){
    const { name, description, grade, subject, imageUrl} = req.body
    Resource.findByIdAndUpdate(req.params.id, 
        {
            name,
            description,
            grade,
            subject,
            imageUrl
        },
        {new: true})
    .then((updatedResource) => {
        console.log(updatedResource)
        res.redirect(`/resources/resource-details/${req.params.id}`)
    })
    .catch((err) => {
        console.log(err)
    })
}
// FOR DELETING PAGES FROM THE PROFILE

function deleteImage(req, res, next){
    image.findByIdAndDelete(req.params.id)
    .then((confirmation) => {
        console.log(confirmation)
        res.redirect('/members/member-profile')
    })
    .catch((err) => {
        console.log(err)
    })
}
//FILTERING FIND
function showFindResource(req, res, next) {
    res.render('resources/findResource.hbs')
  }
  
  function displayFoundResource(req, res, next){
    const { name, description, grade, subject, imageUrl} = req.body
    if (grade && subject){
        Resource.find({ 
            "$and": [
            {grade},
            {subject}
        ]}  
    )
    .then((foundResource) => {
        console.log('**** for $and...here is the resource I got***', foundResource)
        res.render('resources/foundResource.hbs', {foundResource})
    })
    .catch((err) =>{
        console.log("On line 152", err)
    })
    } else {
        Resource.find({ 
            "$or": [
            {grade},
            {subject}
        ]}
    )
    .then((foundResource) => {
        console.log('**** for $or...here is the resource I got***', foundResource)
        res.render('resources/foundResource.hbs', {foundResource})
    })
    .catch((err) =>{
        console.log("On line 152", err)
    })
    } 
}



let Amiarr = [

    Amigurumi ({
title: "Toothless",
level: "Intermediate",
type: "Amigurumi",
itemsNeeded: [
    "Black yarn", 
    "black and green felt",
    "yarn needle",
    "stitch markers",
    "polyfil stuffing",
    "black yarn",
],
hookNeeded: "4.25 mm - US terms",
yarnType: "4 - Worsted/Aran",
image: "./images/Amigurumi/Toothless-img.png" ,
Stitches: [
    "Ch - Chain",
    "SC - single crochet",
    "INC - single crochet increase",
    "DEC - single crochet decrease", 
    "HDC - Half-double Crochet",
    "BLO - Back-loop only",
    "MR - Magic ring", 
    "SL ST - Slip Stitch",
    "FO - Fasten off",
],
creator: "Nichole's Nerdy Knots",
creatorLink: <a href= "www.facebook.com/nicholesnerdyknots"> nicholesnerdyknots</a>
},
{
title: "Squirt",
level: "Intermediate",
type: "Amigurumi",
itemsNeeded: [
    "Cherry Red yarn", 
    "warm brown yarn",
    "yarn needle",
    "stitch markers",
    "2 skeing of soft green yarn",
    "white yarn",
    "black yarn",
    "Polyfil stuffing",
],
hookNeeded: "4.25 mm - US terms",
yarnType: "4 - Worsted/Aran",
image: "./images/Amigurumi/Squirt.png",
Stitches: [
    "Ch - Chain",
    "SC - single crochet",
    "DC - double crochet increase",
    "TR - Triple crochet decrease", 
    "HDC - Half-double Crochet",
    "DC2TOG - DC decrease",
    "DC3TOG - DC decrease with 3 stitches", 
    "SL ST - Slip Stitch",
    "FO - Fasten off",
],
creator: "Cuddles and Curiosities",
creatorLink: <a href= ""> </a>
},
{
title: "Baby Sully",
level: "Hopeful Beginner",
type: "Amigurumi",
itemsNeeded: [
    "Color A: turquoise (60 yds)",
    "Color B: dark blue (3 yds)",
    "Color C: yellow (5 yds)",
    "Color D: lavender (2 yds)",
    "2 8mm saftey eyes",
    "Polyfil stuffing",
    "yarn needle",
],
hookNeeded: "3.75 mm - US terms",
yarnType: "4 - Worsted/Aran",
image: "../images/Amigurumi/Baby-Sully.png",
Stitches: [
    "MR - Magic ring", 
    "Ch - Chain",
    "SC - single crochet",
    "DEC - single crochet decrease",
    "BLO - Back-loop only",
    "FLO - Front-loop only",
    "INC - single crochet increase",
    "SL ST - slip stitch",
    
    
],
creator: "A Morning Cup of Jo Creations",
creatorLink: <a href= "https://www.facebook.com/amorningcupofjocreations">A Morning Cup of Jo Creations </a>
},
{
title: "Baby Mike",
level: "Hopeful Beginner",
type: "Amigurumi",
itemsNeeded: [
    "Color A: lime green (30 yds)",
    "Color B: yellow (1 yd)",
    "PolyFil Stuffing",
    "1 12 MM safety eye",
    "White and Blue felt",
    "Fabric glue",
    "Yarn Needle",
    
],
hookNeeded: "3.75 mm - US terms",
yarnType: "4 - Worsted/Aran",
image: "/images/Amigurumi/Baby-Mike.png",
Stitches: [
    "Ch - Chain",
    "SC - single crochet",
    "DEC - single crochet decrease",
    "SL ST - Slip Stitch", 
    "INC - single crochet increase",
    
],
creator: "A Morning Cup of Jo Creations",
creatorLink: <a href= "https://www.facebook.com/amorningcupofjocreations">A Morning Cup of Jo Creations </a>

},
{
title: "Baphoment - Kawaii",
level: "Hopeful Beginner",
type: "Amigurumi",
itemsNeeded: [
    "4 colors of your choice",
    "Black Embroidery Floss",
    "PolyFil Stuffing",
    "20MM Safety eyes",
    "Scissors",
    "Fabric glue",
    "Yarn Needle",
    "5mm/10mm jump-rings for earrings (optional)",
    
],
hookNeeded: "3 mm and 3.5mm - US terms",
yarnType: "4 - Worsted/Aran",
image: "images/Amigurumi/Baphoment-Kawaii.png",
Stitches: [
    "CH - Chain",
    "SC - single crochet",
    "DEC - single crochet decrease",
    "SL ST - Slip Stitch", 
    "INC - single crochet increase",
    "MR - Magic Ring",
    "INC3 - 3 single crochet",
    "INC5 - 5 single crochet",
    "3 SCTOG - 3 single crochet decrease",
    "FO - fasten off"
    
],
creator: "GATO FU",
creatorLink: <a href= "http://www.etsy.com/shop/gatofu">GATO FU</a>
},
{
    title: "Stitch",
    level: "Intermediate",
    type: "Amigurumi",
    itemsNeeded: [
        "Blue/Grey Yarn",
        "Light Blue Yarn",
        "PolyFil Stuffing",
        "Pink, black and white roving wool",
        ],
    hookNeeded: "4 mm - US terms",
    yarnType: "4 - Worsted/Aran",
    image: "images/Amigurumi/Stitch.png",
    Stitches: [
        "CH - Chain",
        "SC - single crochet",
        "DEC - single crochet decrease",
        "SL ST - Slip Stitch", 
        "INC - single crochet increase",
        "MR - Magic Ring",
        "HDC - half double crochet",
        "BLO - back-loop only",
        "TR - Triple crochet",
        "FO - fasten off"
        
    ],
    creator: "Rolly Crochet",
    creatorLink: <a href= "blog.pianetadonna.it/rollycrochet/">Rolly Crochet</a>
},
{
    title: "3D Skull ",
    level: "Advanced",
    type: "Amigurumi",
    itemsNeeded: [
        "White yarn",
        "Black embroidery floss",
        "floral wire",
        "stitch markers",
        "Firm polyfil stuffing",
        "tapestry needle",
        "scissors"
        ],
    hookNeeded: "3 mm - US terms",
    yarnType: "3 - Light worsted/DK",
    image: ".images/Amigurumi/AMI-Skull.png",
    Stitches: [
        "CH - Chain",
        "SC - single crochet",
        "DEC - single crochet decrease",
        "SL ST - Slip Stitch", 
        "INC - single crochet increase",
        "MR - Magic Ring",
        "HDC - half double crochet",
        "RSM - running stitch marker",
        "DC - double crochet",
        "FO - fasten off"
        
    ],
    creator: "Million Bells",
    creatorLink: <a href= "http://www.etsy.com/shop/millionbells">Million Bells</a>
},
{
    title: "Willendorf Venus ",
    level: "Advanced",
    type: "Amigurumi",
    itemsNeeded: [
        "light brown or beige yarn",
         "stitch markers",
        "Firm polyfil stuffing",
        "tapestry needle",
        "scissors"
        ],
    hookNeeded: "2.25mm - US terms",
    yarnType: "1 - super fine/fingering",
    image: ".images/Amigurumi/venus-willendorf.png",
    Stitches: [
        "CH - Chain",
        "SC - single crochet",
        "DEC - single crochet decrease",
        "SL ST - Slip Stitch", 
        "INC - single crochet increase",
        "MR - Magic Ring",
        "RD - round"
        
    ],
    creator: "Trishagurumi",
    creatorLink: <a href= "">Trishagurumi</a>

})
];

let clothingArr = [


Clothing ({

    title: "Broomstick Cowl ",
    level: "Advanced",
    type: "Clothing",
    itemsNeeded: [
        "160 yards of any color yarn",
        "Stitch markers",
        "tapestry needle",
        "1 medium or large button",
        "25 mm knitting needle or pin"
         ],
    hookNeeded: "3.5 mm, 4 mm - US terms",
    yarnType: "3 - Light Worsted/DK ",
    image: ".images/Clothing/Broomstick-cowl.png",
    Stitches: [
        "CH - Chain",
        "SC - single crochet",
                
    ],
    creator: "Mon Petit Violon Designs",
    creatorLink: <a href= "http://www.monpetitviolon.com/">Mon Petit Violon Designs</a>
},
{
    title: "Starry Night Sweater ",
    level: "Advanced",
    type: "Clothing",
    itemsNeeded: [
        "1,200 yards of Main Color Yarn ",
        "50 Yards of Dark Dark Blue yarn",
        "50 Yards of Dark Blue yarn",
        "50 Yards of Blue yarn",
        "50 Yards of Light Blue yarn",
        "10 Yards of yellow yarn",
        "20 yards of black yarn",
        "Stitch markers",
        "tapestry needle"
        ],
    hookNeeded: "5.5 mm - US terms",
    yarnType: "4 - Worsted/Aran",
    image: "./images/Clothing/Starry-Night-sweater.png",
    Stitches: [
        "CH - Chain",
        "SC - single crochet",
        "DEC - single crochet decrease",
        "SL ST - Slip Stitch", 
        "INC - single crochet increase",
        "MS - mattress stitch",
        "WS - whip stitch",
        "TC - tapestry crochet",
        "IC - intarsia crochet",
        "DC - double crochet",
        "BLO - back-loop only"
        
    ],
    creator: "Kayla Genato",
    creatorLink: <a href= "http://www.instagram.com/craftsbygelato">Kayla Genato</a>
},
{
    title: "Checkered Cowl ",
    level: "Beginner",
    type: "Clothing",
    itemsNeeded: [
        "3 skeins of yarn",
        "Stitch markers",
        "yarn needle"
        ],
    hookNeeded: "6.5 mm - US terms",
    yarnType: "4 - Worsted/Aran",
    image: "./images/Clothing/Checkered-cowl.png",
    Stitches: [
        "CH - Chain",
        "SC - single crochet",
        "DEC - single crochet decrease",
        "DC - double crochet",
        "BPDC - back post double crochet",
        "FPDC - front post double crochet"
        
    ],
    creator: "Yarnspirations - Designed by Heather Lodinsky",
    creatorLink: <a href= "http://www.yarnspirations.com">Yarnspirations</a>
},
{
    title: "Single Strap Sweater Dress ",
    level: "Intermediate",
    type: "Clothing",
    itemsNeeded: [
        "1400 yards of yarn",
        "Stitch markers",
        "yarn needle",
        "tape measure",
        ],
    hookNeeded: "5 mm, 7 mm - US terms",
    yarnType: "4 - Worsted/Aran",
    image: "./images/Clothing/single-strap-sweater-dress.png",
    Stitches: [
        "CH - Chain",
        "SC - single crochet",
        "DEC - single crochet decrease",
        "DC - double crochet",
        "BLO - back-loop only",
        "SL-ST - slip stitch"
        
    ],
    creator: "TCDDIY",
    creatorLink: <a href= "https://youtu.be/ScUJ3Aay_L8">TCDDIY</a>
},
{
    title: "Curvy Pull Over ",
    level: "hopeful beginner",
    type: "Clothing",
    itemsNeeded: [
        "Yarn amount varies",
        "Stitch markers",
        "yarn needle",
        "tape measure",
        ],
    hookNeeded: "9 mm - US terms",
    yarnType: "6 - Super Bulky",
    image: "./images/Clothing/Curvy-pull-over.png",
    Stitches: [
        "CH - Chain",
        "SC - single crochet",
        "DEC - single crochet decrease",
        "DC - double crochet",
        "BLO - back-loop only",
        "SL-ST - slip stitch",
        "HDC - half double crochet"
        
    ],
    creator: "Yarnspirations",
    creatorLink: <a href= "https://www.yarnspirations.com">Yarnspirations</a>
},
{
    title: "Hazy Unicorn Shawl ",
    level: "hopeful beginner",
    type: "Clothing",
    itemsNeeded: [
        "6 skeins of yarn",
        "Stitch markers",
        "yarn needle",
        "tape measure",
        ],
    hookNeeded: "7 mm - US terms",
    yarnType: "6 - Super Bulky",
    image: "./images/Clothing/Curvy-pull-over.png",
    Stitches: [
        "CH - Chain",
        "SC - single crochet",
        "DEC - single crochet decrease",        
    ],
    creator: "Hobbi",
    creatorLink: <a href= "http://shop.hobbii.com/hazy-unicorn-shawl">Hobbi</a>
},
{
    title: "Madison Shoulder Wrap ",
    level: "intermediate",
    type: "Clothing",
    itemsNeeded: [
        "1300-1500 yards of yarn A",
        "1200 - 1400 yards of yarn B",
        "Stitch markers",
        "yarn needle",
        "tape measure",
        ],
    hookNeeded: "3mm, 4mm, 5mm - US terms",
    yarnType: "3 - Light Worsted/DK for yarn A, 4 - Worsted/Aran",
    image: "./images/Clothing/Madison-shoulder-wrap.png",
    Stitches: [
        "CH - Chain",
        "CH SP - chain space",
        "SC - single crochet",
        "DC - double crochet",
        "TR - triple crochet",
        "HDC - half double crochet",
        "HDC3L - half double croch in 3rd loop",
        "TR2TOG - triple crochet decrease with 2 chair spaces",
        "FPDC - front post double crochet",
        "BBL - bobble stitch",
        "FHDC - foundation half double crochet"
                
    ],
    creator: "Christel Riley Watts",
    creatorLink: <a href= "">Christel Riley Watts</a>
},
{
    title: "Skull Cocoon Sweater ",
    level: "intermediate",
    type: "Clothing",
    itemsNeeded: [
        "4 skeins of yarn",
        "Stitch markers",
        "yarn needle",
        "tape measure",
        ],
    hookNeeded: "6mm - US terms",
    yarnType: "5 - Chunky",
    image: "./images/Clothing/skull-cocoon-sweater.png",
    Stitches: [
        "CH - Chain",
        "SL ST - slip stitch",
        "CH SP - chain space",
        "SC - single crochet",
        "DC - double crochet",
        "TR - triple crochet",
        "HDC - half double crochet",
        "SP - space"
                
    ],
    creator: "Caryns Creations",
    creatorLink: <a href= "">Caryns Creations</a>
})
]




module.exports = router;