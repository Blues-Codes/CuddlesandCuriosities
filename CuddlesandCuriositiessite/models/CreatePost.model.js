const { Schema, model } = require('mongoose');

const createPostSchema = new Schema({
    name: {type: String, maxlength: 100},
    description: { type: String, maxlength: 300 },
    owner: {type: Schema.Types.ObjectId, ref: "Members" },
    imageUrl: {type: String},
  });

module.exports = model('CreatePost', createPostSchema); 