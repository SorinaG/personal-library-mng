const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  public: {
    type: Boolean,
    required: true
  },
  approved: {
    type: Boolean,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  synopsis: {
    type: String,
    required: true
  },
  isbn: {
    type: String
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
