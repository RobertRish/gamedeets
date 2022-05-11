const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const gameSchema = new Schema({
  
  // saved book id from GoogleBooks
  gameId: {
    type: String,
    required: true,
  },
  gameName: {
    type: String,
  },
  artURL: {
    type: String,
  },
});

module.exports = gameSchema;
