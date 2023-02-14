const { Schema, model } = require('mongoose');

const CreatePostSchema = new Schema({
    name: {type: String, maxlength: 100},
    user: { type: Schema.Types.ObjectId, ref: "User" },
    description: { type: String, maxlength: 300 },
  });

module.exports = model('create', createpostschema); 