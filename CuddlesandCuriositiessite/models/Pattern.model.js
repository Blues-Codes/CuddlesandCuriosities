const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patternSchema = new Schema({
 
    title: { type: String, required: true, unique: true },
    level: { type: String, 
           enum: ["Beginner","Hopeful Beginner","Intermediate", "Advanced"]
          },
    type:{ type: String},
    itemsNeeded: { type: [ String ] },
    hookNeeded: { type : String },
    yarnType: { type: String, enum: ["0 - lace", "1 - fingering", "2 - Sport/Baby", "3 - Light Worsted/DK", "4 - Worsted/Aran", "5 - Bulky", "6 - Super Bulky", "7 - Jumbo"] },
    image: { type: String, required: true, default: ""},
    stitches: { type: [ String ]},
    creator: { type: String, required:true },
    creatorLink: { type: String },
  
});
const Pattern = mongoose.model('Pattern', patternSchema);

module.exports = Pattern;