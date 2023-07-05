const Book = require("../models/book.model.js");
const BookLink = require("../models/bookLink.model.js");

const getBookLinks = async (req, res, next) => {
  try {
    let { page, sort_by, sort_direction, search, genre, status } = req.query;

    let userId = req.user._id;

    const matchQuery = {
      "userId": userId
    }

    if(genre) {
      matchQuery["book.genre"] = { $regex: genre, $options: 'i' };
    }

    if(status) {
      matchQuery["status"] = { $regex: status, $options: 'i' };
    }

    const bookLinks = await BookLink.aggregate([
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'book'
        }
      },
      {
        $match: matchQuery
      },
    ])


    // if (genreQuery) {
    //   query["bookId.genre"] = genreQuery;
    // }

    // let bookLinks = await BookLink.populate("bookId").find(
    //   { query },
    //   {},
    //   { skip: 10 * (page - 1), limit: 10 }
    // );

    res.send(bookLinks);
  } catch (error) {
    next(error);
  }
};

// user adds in the list the book that already exists aka creates a new bookLink
const createBookLink = async (req, res, next) => {
  try {
    const bookLink = req.body;
    bookLink.userId = req.user._id;

    let checkExistingBook = await Book.findById(bookLink.bookId);
    if (checkExistingBook == null) {
      res.status(404).send({ message: "Book not found" });
      return;
    }

    let checkDuplicatedLink = await BookLink.findOne({
      bookId: bookLink.bookId,
    });
    if (checkDuplicatedLink) {
      res.status(409).send({ message: "Duplicated book link" });
      return;
    }

    let createdBook = await BookLink.create(bookLink);
    res.status(201).send(createdBook);
  } catch (error) {
    next(error);
  }
};

// const createAndLink = async (req, res, next) => {
//   try {
//     const body = req.body;
//     const { title, author } = body.book;

//     let checkExistingBook = await Book.findOne({
//       title: title,
//       author: author,
//     });
//     if (checkExistingBook) {
//       res.status(409).send({
//         message: "Book with the same title and author already exists",
//       });
//       return;
//     }

//     body.book.approved = false;
//     body.bookLink.userId = req.user._id;
//     let createdBook = await Book.create(body.book);
//     let createdLink = await BookLink.create(body.bookLink);
//     res.status(201).send(createdLink);
//   } catch (error) {
//     next(error);
//   }
// };

const editBookLink = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const bookLinkId = req.body._id;
    const updatedBookLinkBody = req.body;
    updatedBookLinkBody.userId = userId;

    const updatedBookLink = await BookLink.findOneAndUpdate(
      {
        userId: userId,
        _id: bookLinkId,
      },
      updatedBookLinkBody,
      {
        new: true,
      }
    );

    if (!updatedBookLink) {
      res.status(404).send({ message: "Book not found" });
    } else {
      res.send(updatedBookLink);
    }
  } catch (error) {
    next(error);
  }
};

const deleteBookLink = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const bookLinkId = req.body._id;
    const deletedBookLink = await BookLink.findOneAndDelete({
      userId: userId,
      _id: bookLinkId,
    });

    if (!deletedBookLink) {
      res.status(404).send({ message: "Book link not found" });
    } else {
      res.send({ message: "Book link deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
};

const getQuotes = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const bookLinks = await BookLink.find({
      userId: userId,
    }).populate("bookId");

    res.send(bookLinks);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBookLinks,
  createBookLink,
  editBookLink,
  deleteBookLink,
  getQuotes,
};
