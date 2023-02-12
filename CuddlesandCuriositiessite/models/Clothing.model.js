const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clothingSchema = new Schema({
 
    title: { type: String, required: true, unique: true },
    level: { type: String, 
           enum: ["Beginner","Hopeful beginner","intermediate", "Advanced"]
          },
    itemsNeeded: { type: [ String ] },
    hookNeeded: { type : String },
    yarnType: { type: String, enum: ["0 - lace", "1 - sockyarn/fingering ", "2 -Sport/Baby", "3 - DK/Light Worsted", "4 - Worsted/Aran", "5 - Bulky", "6 - Super Bulky", "7 - Jumbo"] },
    image: { type: String, required: true, default: "https:images.media-allrecipes.com/images/75131.jpg"},
    duration: { type: Number, min: 0, },
    creator: { type: String, required:true },
    creatorLink: { type: Date },
  
});
const Clothing = mongoose.model('Clothing', clothingSchema);

module.exports = Clothing;