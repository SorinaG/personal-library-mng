import React, { useState, useRef } from "react";
import Layout from "../components/Layout";
import {
  getBookById,
  editBookLink,
  deleteBookLink,
  createBookLink,
} from "../api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import Modal from "../components/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import useS3 from "../utils/useS3";

function BookPage() {
  const token = useSelector((store) => store.auth.token);
  const navigate = useNavigate();
  const params = useParams();
  const bookId = params.id;
  const [book, setBook] = useState({});
  const [bookLink, setBookLink] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [tempReview, setTempReview] = useState("");
  const [isBookLoaded, setIsBookLoaded] = useState(false);

  const [newQuote, setNewQuote] = useState("");
  const [isAddingQuote, setIsAddingQuote] = useState(false);
  const [savedQuotes, setSavedQuotes] = useState(bookLink);

  const quoteListBottom = useRef(null);

  const [coverImage, setCoverImage] = useState(null);

  const s3 = useS3();

  const scrollToBottom = () => {
    quoteListBottom.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getBook();
  }, []);

  async function getBook() {
    const bookResponse = await getBookById(token, bookId);
    if (bookResponse?.book) setBook(bookResponse.book);
    if (bookResponse?.bookLink) setBookLink(bookResponse.bookLink);

    if (bookResponse?.book.s3Key) {
      const params = {
        Bucket: "personal-library-sorina",
        Key: bookResponse.book.s3Key,
      };
      const cover = await s3.getSignedUrlPromise("getObject", params);

      setCoverImage(cover);
    }
  }

  const handleRatingChange = (value) => {
    setBookLink((prevState) => {
      return {
        ...prevState,
        rating: value,
      };
    });
  };

  useEffect(() => {
    if (isEditingReview) {
      setTempReview(bookLink.review);
    }
  }, [isEditingReview]);

  useEffect(() => {
    if (isBookLoaded) {
      scrollToBottom();
    }
  }, [bookLink?.quotes]);

  const saveReview = () => {
    setBookLink((prevState) => {
      return {
        ...prevState,
        review: tempReview,
      };
    });
    editBookLink(token, bookLink);
    setIsEditingReview(false);
    setTempReview("");
  };

  const closeReviewModal = () => {
    setShowReview(false);
    setIsEditingReview(false);
    setTempReview("");
  };

  const closeQuotesModal = () => {
    setNewQuote("");
    setShowQuotes(false);
    setIsAddingQuote(false);
  };

  const hasBookLink = () => bookLink?._id;

  const handleBookStatus = (status) => {
    setBookLink((prevState) => {
      return {
        ...prevState,
        status: status,
      };
    });
  };

  const handleSaveQuote = () => {
    if (newQuote) {
      setBookLink((prevState) => {
        return {
          ...prevState,
          quotes: [...prevState.quotes, newQuote.trim()],
        };
      });
    }
    setNewQuote("");
  };

  const handleDeleteQuote = (index) => {
    setBookLink((prevState) => {
      const updatedQuotes = [...prevState.quotes];
      updatedQuotes.splice(index, 1);
      return {
        ...prevState,
        quotes: updatedQuotes,
      };
    });
  };

  useEffect(() => {
    if (isBookLoaded && bookLink) {
      editBookLink(token, bookLink);
    } else {
      setIsBookLoaded(true);
    }
  }, [bookLink]);

  const createNewBookLink = async () => {
    if (!hasBookLink()) {
      const defaultBookLink = {
        bookId: book._id,
        status: "Not Started",
      };

      let newBookLink = await createBookLink(token, defaultBookLink);
      setBookLink(newBookLink);
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col mt-3">
            <div className="card">
              <div className="card-body row">
                <img
                  className="col-12 col-md-5 col-lg-3 w-sm-50 w-md-25"
                  src={coverImage}
                />
                <div className="col-12 col-md-7 col-lg-9 mt-3 row">
                  <div className="col-9 col-sm-3 col-md-6">
                    <label className="fw-bold">Title</label>
                    <p>{book?.title}</p>
                  </div>
                  <div className="col-3 col-sm-3 col-md-6">
                    <label className="fw-bold">Released</label>
                    <p>{book?.year}</p>
                  </div>
                  <div className="col-9 col-sm-3 col-md-6">
                    <label className="fw-bold">Author</label>
                    <p>{book?.author}</p>
                  </div>
                  <div className="col-3 col-sm-3 col-md-6">
                    <label className="fw-bold">Genre</label>
                    <p>{book?.genre}</p>
                  </div>
                  <div className="col-12">
                    <h5>Synopsis</h5>
                    <p>{book?.synopsis}</p>
                  </div>
                  <div className="col-12 col-sm-7 col-md-4">
                    {hasBookLink() ? (
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setBookLink(null);
                          deleteBookLink(token, bookLink._id);
                        }}
                      >
                        Remove from your list
                      </button>
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={createNewBookLink}
                      >
                        Add to your list
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {hasBookLink() ? (
              <div className="card mt-3">
                <div className="card-body row">
                  <div className="col-6 col-md-2">
                    <DropdownButton
                      title={bookLink.status ?? "Status"}
                      onSelect={handleBookStatus}
                    >
                      <Dropdown.Item eventKey="Completed">
                        Completed
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="In Progress">
                        In progress
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Not Started">
                        Not Started
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="col-6 col-md-3">
                    <Rating
                      value={bookLink?.rating}
                      onChange={handleRatingChange}
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowReview(true)}
                    >
                      Review
                    </button>
                  </div>
                  <div className="col-6 col-md-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowQuotes(true)}
                    >
                      Quotes
                    </button>
                  </div>
                  <div className="col-12 col-sm-7 col-md-4"> </div>
                  <div className="col-6 col-md-3"></div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Modal onClose={closeReviewModal} isShown={showReview} title="Review">
        <div className="row">
          <div className="col-12">
            {isEditingReview ? (
              <>
                <div className="row">
                  <div className="col-12">
                    <textarea
                      rows="10"
                      className="form-control"
                      value={tempReview}
                      onChange={(e) => setTempReview(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-sm-6 mt-3">
                    <button
                      className="btn btn-success w-100"
                      onClick={saveReview}
                    >
                      Save
                    </button>
                  </div>
                  <div className="col-12 col-sm-6 mt-3">
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => {
                        setIsEditingReview(false);
                        setTempReview("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p>{bookLink?.review}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditingReview(true)}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>

      <Modal onClose={closeQuotesModal} isShown={showQuotes} title="Quotes">
        <div className="row">
          <div
            className="overflow-y-scroll col-12 mb-3"
            style={{ maxHeight: "50vh" }}
          >
            <div className="list-group">
              {bookLink?.quotes?.length
                ? bookLink.quotes.map((quote, index) => (
                    <div key={index}>
                      <div className="d-flex">
                        <p className="flex-fill">{quote}</p>
                        <div>
                          <button
                            className="btn btn-sm btn-danger h-auto"
                            onClick={() => handleDeleteQuote(index)}
                          >
                            <i className="bx bx-trash"></i>
                          </button>
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                  ))
                : "There are no quotes"}
              <div ref={quoteListBottom} />
            </div>
          </div>
          {isAddingQuote ? (
            <>
              <div className="col-12">
                <textarea
                  className="form-control"
                  value={newQuote}
                  onChange={(event) => setNewQuote(event.target.value)}
                />
              </div>
              <div className="col-6">
                <button
                  className="btn btn-success mt-2 w-100"
                  onClick={handleSaveQuote}
                >
                  Save
                </button>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-danger mt-2 w-100"
                  onClick={() => {
                    setIsAddingQuote(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div className="col-12">
              <button
                className="btn btn-primary mt-2"
                onClick={() => setIsAddingQuote(true)}
              >
                Add
              </button>
            </div>
          )}
        </div>
      </Modal>
    </Layout>
  );
}

export default BookPage;
