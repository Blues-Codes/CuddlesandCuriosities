const mongoose = require('mongoose');
const Pattern = require('./models/Pattern.model');

const  allPatterns = [

    {
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
image: "https://res.cloudinary.com/doenxkhcf/image/upload/v1676323185/Pattern%20photos/Toothless-img_ssswf5.png" ,
stitches: [
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
creatorLink:   "www.facebook.com/nicholesnerdyknots" 
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
image: "https://res.cloudinary.com/doenxkhcf/image/upload/v1676323215/Pattern%20photos/Squirt_npzhyh.png",
stitches: [
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
creatorLink: ''
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
image: "https://res.cloudinary.com/doenxkhcf/image/upload/v1676323185/Pattern%20photos/Baby-Sully_j7r3wl.png",
stitches: [
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
creatorLink: "https://www.facebook.com/amorningcupofjocreations"
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
image: "https://res.cloudinary.com/doenxkhcf/image/upload/v1676323185/Pattern%20photos/Baby-Mike_as9myy.png",
stitches: [
    "Ch - Chain",
    "SC - single crochet",
    "DEC - single crochet decrease",
    "SL ST - Slip Stitch", 
    "INC - single crochet increase",
    
],
creator: "A Morning Cup of Jo Creations",
creatorLink:  "https://www.facebook.com/amorningcupofjocreations"

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
image: "https://res.cloudinary.com/doenxkhcf/image/upload/v1676323185/Pattern%20photos/Baphoment-Kawaii_dqtg1o.png",
stitches: [
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
creatorLink: "http://www.etsy.com/shop/gatofu"
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
    image: "https://res.cloudinary.com/doenxkhcf/image/upload/v1676323215/Pattern%20photos/Stitch_cyes9q.png",
    stitches: [
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
    creatorLink: "blog.pianetadonna.it/rollycrochet/"
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
    yarnType: "3 - Light Worsted/DK",
    image: "https://res.cloudinary.com/doenxkhcf/image/upload/v1676323185/Pattern%20photos/AMI-Skull_n2922l.png",
    stitches: [
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
    creatorLink:  "http://www.etsy.com/shop/millionbells"
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
    yarnType: "1 - fingering",
    image: "https://res.cloudinary.com/doenxkhcf/image/upload/v1676323185/Pattern%20photos/venus-willendorf_ldjcd5.png",
    stitches: [
        "CH - Chain",
        "SC - single crochet",
        "DEC - single crochet decrease",
        "SL ST - Slip Stitch", 
        "INC - single crochet increase",
        "MR - Magic Ring",
        "RD - round"
        
    ],
    creator: "Trishagurumi",
    creatorLink: ""

},
{

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
    yarnType: "3 - Light Worsted/DK",
    image: "https://res.cloudinary.com/doenxkhcf/image/upload/v1676392367/Pattern%20photos%20-%20clothing/Broomstick-cowl_scnykh.png",
    stitches: [
        "CH - Chain",
        "SC - single crochet",
                
    ],
    creator: "Mon Petit Violon Designs",
    creatorLink: "http://www.monpetitviolon.com/"
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
    image: "https://res.cloudinary.com/doenxkhcf/image/upload/v1676392368/Pattern%20photos%20-%20clothing/Starry-Night-sweater_ugysfl.png",
    stitches: [
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
    creatorLink: "http://www.instagram.com/craftsbygelato"
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
    image: "https://res.cloudinary.com/doenxkhcf/image/upload/v1676392368/Pattern%20photos%20-%20clothing/Checkered-cowl_cshwlb.png",
    stitches: [
        "CH - Chain",
        "SC - single crochet",
        "DEC - single crochet decrease",
        "DC - double crochet",
        "BPDC - back post double crochet",
        "FPDC - front post double crochet"
        
    ],
    creator: "Yarnspirations - Designed by Heather Lodinsky",
    creatorLink: "http://www.yarnspirations.com"
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
    image: "https://res.cloudinary.com/doenxkhcf/image/upload/v1676392367/Pattern%20photos%20-%20clothing/single-strap-sweater-dress_gtupcr.png",
    stitches: [
        "CH - Chain",
        "SC - single crochet",
        "DEC - single crochet decrease",
        "DC - double crochet",
        "BLO - back-loop only",
        "SL-ST - slip stitch"
        
    ],
    creator: "TCDDIY",
    creatorLink: "https://youtu.be/ScUJ3Aay_L8"
},
{
    title: "Curvy Pull Over ",
    level: "Hopeful Beginner",
    type: "Clothing",
    itemsNeeded: [
        "Yarn amount varies",
        "Stitch markers",
        "yarn needle",
        "tape measure",
        ],
    hookNeeded: "9 mm - US terms",
    yarnType: "6 - Super Bulky",
    image: "https://res.cloudinary.com/doenxkhcf/image/upload/v1676392367/Pattern%20photos%20-%20clothing/Curvy-pull-over_sy5fy8.png",
    stitches: [
        "CH - Chain",
        "SC - single crochet",
        "DEC - single crochet decrease",
        "DC - double crochet",
        "BLO - back-loop only",
        "SL-ST - slip stitch",
        "HDC - half double crochet"
        
    ],
    creator: "Yarnspirations",
    creatorLink:  "https://www.yarnspirations.com"
},
{
    title: "Hazy Unicorn Shawl ",
    level: "Hopeful Beginner",
    type: "Clothing",
    itemsNeeded: [
        "6 skeins of yarn",
        "Stitch markers",
        "yarn needle",
        "tape measure",
        ],
    hookNeeded: "7 mm - US terms",
    yarnType: "6 - Super Bulky",
    image: "https://res.cloudinary.com/doenxkhcf/image/upload/v1676392367/Pattern%20photos%20-%20clothing/hazy-unicorn-shawl_w2dk2g.png",
    stitches: [
        "CH - Chain",
        "SC - single crochet",
        "DEC - single crochet decrease",        
    ],
    creator: "Hobbi",
    creatorLink:"http://shop.hobbii.com/hazy-unicorn-shawl"
},
{
    title: "Madison Shoulder Wrap ",
    level: "Intermediate",
    type: "Clothing",
    itemsNeeded: [
        "1300-1500 yards of yarn A",
        "1200 - 1400 yards of yarn B",
        "Stitch markers",
        "yarn needle",
        "tape measure",
        ],
    hookNeeded: "3mm, 4mm, 5mm - US terms",
    yarnType: "3 - Light Worsted/DK",
    image: "./images/Clothing/Madison-shoulder-wrap.png",
    stitches: [
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
    creatorLink: ''
},
{
    title: "Skull Cocoon Sweater ",
    level: "Intermediate",
    type: "Clothing",
    itemsNeeded: [
        "4 skeins of yarn",
        "Stitch markers",
        "yarn needle",
        "tape measure",
        ],
    hookNeeded: "6mm - US terms",
    yarnType: "5 - Bulky",
    image: "https://res.cloudinary.com/doenxkhcf/image/upload/v1676392368/Pattern%20photos%20-%20clothing/skull-cocoon-sweater_xboozf.png",
    stitches: [
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
    creatorLink: ''
}
]

const seedDB = async () => {
    await Pattern.insertMany(allPatterns);
    
};
seedDB().then(() =>{
    mongoose.connection.close();
});
