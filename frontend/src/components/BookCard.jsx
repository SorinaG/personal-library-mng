import React from "react";
import { getBookById } from "../api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  const navigate = useNavigate();

  const token = useSelector((store) => store.auth.token);

  //   async function detailsAboutBook() {
  //     const bookResponse = await getBookById(token, book._id);

  //     navigate(`/book/${book._id}`)
  //     //   setBook(bookResponse)
  //   }

  //   getBook()

  function handleBook() {
    navigate(`/book/${book._id}`);
  }

  return (
    <>
      <div className="card border border-3 rounded-3 border-secondary less-opaque">
        {/* <img src="..." classNameName="card-img-top" alt="..." /> */}
        <div className="card-body">
          <h4 className="card-title">{book.title}</h4>
          <h5 className="card-title">{book.author}</h5>
          <button className="btn btn-outline-primary" onClick={handleBook}>
            <span className="fw-bold">Details</span>
          </button>
          {/* <a href="#" className="btn btn-primary">
            Go somewhere
          </a> */}
        </div>
      </div>
    </>
  );
}

export default BookCard;
