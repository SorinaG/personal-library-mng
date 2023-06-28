const mongoose = require("mongoose");

const bookLinkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  review: {
    type: String,
    maxlength: 5000,
  },
  status: {
    type: String,
    required: true,
  },
  quotes: {
    type: [String]
  }
});

// content: {
//   type: [String]
// }

const BookLink = mongoose.model("BookLink", bookLinkSchema);

module.exports = BookLink;