import React from "react";
import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  const navigate = useNavigate();

  function handleBook() {
    navigate(`/book/${book._id}`);
  }

  const s3Root = "https://personal-library-sorina.s3.eu-north-1.amazonaws.com/";

  return (
    <>
      <div className="card border border-3 rounded-3 border-secondary less-opaque">
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <h4 className="card-title">{book.title}</h4>
              <h5 className="card-title">{book.author}</h5>
              <button className="btn btn-outline-primary" onClick={handleBook}>
                <span className="fw-bold">Details</span>
              </button>
            </div>
            <div className="col-6 row">
              {book.s3Key ? (
                <img
                  className="col-12 col-md-5 col-lg-3 w-100"
                  src={s3Root + book.s3Key}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookCard;
