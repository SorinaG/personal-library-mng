import React, { useState } from "react";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { getBooksForApprove, approveBook, deleteBook } from "../api";
import { useSelector } from "react-redux";

function AdminPage() {
  const [booksForApprove, setBooksForApprove] = useState([]);

  const token = useSelector((store) => store.auth.token);

  useEffect(() => {
    handleBooksForApprove();
  }, []);

  async function handleBooksForApprove() {
    const booksForApproveResponse = await getBooksForApprove(token);
    setBooksForApprove(booksForApproveResponse);
  }

  const s3Root = "https://personal-library-sorina.s3.eu-north-1.amazonaws.com/";

  async function tryToApproveBook(bookId) {
    const approvedBook = await approveBook(token, bookId);
    setBooksForApprove((prevState) => {
      const updatedState = [...prevState];

      const updatedApproved = updatedState.filter((book) => book._id != bookId);

      return updatedApproved;
    });
  }

  async function tryToDeleteBook(bookId) {
    const deleteResponse = await deleteBook(token, bookId);
    if(deleteResponse.message == "Book deleted successfully") {
      setBooksForApprove((prevState) => {
        const updatedState = [...prevState]
        const updatedDeleted = updatedState.filter((book) => book._id != bookId)
        
        return updatedDeleted;
      })
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-12">
            {booksForApprove?.map((bookForApprove, index) => (
              <div className="card mt-3" key={index}>
                <div className="card-body row">
                  <div className="col-12 col-md-5 col-lg-3">
                    <div>
                      {bookForApprove.s3Key ? (
                        <img
                          className="col-12 col-md-5 col-lg-3 w-100"
                          src={s3Root + bookForApprove.s3Key}
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className="col-9 col-md-6 row">
                    <div className="col-12 col-md-6">
                      <label className="fw-bold">Title</label>
                      <p>{bookForApprove?.title}</p>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="fw-bold">Author</label>
                      <p>{bookForApprove?.author}</p>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="fw-bold">Genre</label>
                      <p>{bookForApprove?.genre}</p>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="fw-bold ">Created by</label>
                      <p className="capitalize">
                        {bookForApprove?.userId?.username}
                      </p>
                    </div>
                    <div className="col-12 ">
                      <label className="fw-bold">Synopsis</label>
                      <p>{bookForApprove?.synopsis}</p>
                    </div>
                    <div>
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          tryToApproveBook(
                            bookForApprove?._id,
                          )
                        }
                        disabled={bookForApprove.approved}
                      >
                        Approve book
                      </button>
                      <button 
                        className="btn btn-danger ms-3"
                        onClick={() => {
                          tryToDeleteBook(bookForApprove?._id)
                        }}
                      >
                        Delete book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminPage;
