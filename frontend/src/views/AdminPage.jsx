import React, { useState } from "react";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { getBooksForApprove, approveBook } from "../api";
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

  console.log(booksForApprove)

  async function tryToApproveBook(bookId, userId) {
    const approvedBook = await approveBook(token, bookId, userId)
    setBooksForApprove((prevState) => {

      const updatedState = [...prevState]

      const updatedApproved = updatedState.filter(book => book._id != bookId)

      return updatedApproved;      
    })
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
                    <div
                      style={{ backgroundColor: "black", height: 250 }}
                    ></div>
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
                      <p className="capitalize">{bookForApprove?.userId?.username}</p>
                    </div>
                    <div className="col-12 ">
                      <label className="fw-bold">Synopsis</label>
                      <p>{bookForApprove?.synopsis}</p>
                    </div>
                    <div>
                      <button
                        className="btn btn-success"
                        onClick={() => tryToApproveBook(bookForApprove?._id, bookForApprove.userId._id)}
                        disabled={bookForApprove.approved}
                      >
                        Approve book
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
