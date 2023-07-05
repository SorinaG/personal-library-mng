const Book = require("../models/book.model.js");
const BookLink = require("../models/bookLink.model.js");

const createBook = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const book = req.body;
    const { title, author } = book;
    book.approved = false;
    book.userId = userId;

    let checkExistingBook = await Book.findOne({
      title: title,
      author: author,
    });
    if (checkExistingBook) {
      return res
        .status(403)
        .send("Book with the same title and author already exists");
    }

    let createdBook = await Book.create(book);
    createdBook = await Book.findById(createdBook._id).populate(
      "userId",
      "-password"
    );
    res.status(201).send(createdBook);
  } catch (error) {
    next(error);
  }
};

const approveBook = async (req, res, next) => {
  try {
    const bookId = req.body.bookId;

    const existingBook = await Book.findById(bookId);
    if (!existingBook) {
      return res.status(404).send("Book not found");
    }

    existingBook.approved = true;
    const updatedBook = await existingBook.save();
    res.send(updatedBook);
  } catch (error) {
    next(error);
  }
};

const getBooks = async (req, res, next) => {
  try {
    let { page, sort_by, sort_direction, search, title, author } = req.query;
    let query = { approved: true };
    let sort = {};

    if (!page || page < 1) {
      page = 1;
    }

    const titleQuery = { title: { $regex: title, $options: "i" } };
    const authorQuery = { author: { $regex: author, $options: "i" } };

    if (search) {
      query = {
        $and: [
          query,
          {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { author: { $regex: search, $options: "i" } },
            ],
          },
        ],
      };
    } else if (title) {
      query = titleQuery;
    } else if (author) {
      query = authorQuery;
    }

    if (sort_by) {
      let sortField = sort_by;
      let sortDirection = 1;

      if (sort_direction === "desc") {
        sortDirection = -1;
      }

      sort = { [sortField]: sortDirection };
    }

    let books = await Book.find(query)
      .sort(sort)
      .skip(10 * (page - 1))
      .limit(10);

    res.send(books);
  } catch (error) {
    next(error);
  }
};

const getBooksForApprove = async (req, res, next) => {
  try {
    let books = await Book.find({
      approved: false
    }).populate("userId", "-password");

    res.send(books);
  } catch (error) {
    next(error);
  }
};

const editBook = async (req, res, next) => {
  try {
    const bookId = req.body.bookId;
    const updatedBookBody = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookBody, {
      new: true,
    });

    if (!updatedBook) {
      res.status(404).send("Book not found");
    } else {
      res.send(updatedBook);
    }
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const bookId = req.body.bookId;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      res.status(404).send({error: "Book not found"});
    } else {
      const deletedBookLinks = await BookLink.deleteMany({ bookId });
      res.send({message: "Book deleted successfully"});
    }
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).send("Book not found");
    }

    const bookLink = await BookLink.findOne({ bookId: bookId, userId: userId });

    const reviewBookLinks = await BookLink.find({ bookId: bookId, review: { $exists: true, $nin: [ null, "" ] }, userId: { $ne: req.user._id}})

    let responseObj = {
      book,
      bookLink,
      reviewBookLinks 
    };

    res.send(responseObj);
  } catch (error) {
    next(error);
  }
};

const getRandomBooks = async (req, res, next) => {
  try {
    const books = await Book.aggregate([{$match: {approved: true}}, { $sample: { size: 6 } }]);
    res.send(books);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBook,
  approveBook,
  getBooks,
  editBook,
  deleteBook,
  getBookById,
  getBooksForApprove,
  getRandomBooks,
};
