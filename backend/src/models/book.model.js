const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    required: true,
  },
  year: {
    type: Number,
    min: 1900,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  s3Key: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
