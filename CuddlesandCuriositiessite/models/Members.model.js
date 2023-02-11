const { Schema, model } = require('mongoose');

const memberSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      unique: true
    },
       password: {
      type: String,
      required: [true, 'Password is required.']
    },
    imageUrl: String
  },
  {
    timestamps: true
  }
);

module.exports = model('members', memberSchema);

