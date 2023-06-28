import React, { useState } from "react";
import Layout from "../components/Layout";
import { getBooks } from "../api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../utils/useQueryParams";

function BooksPage() {
  const token = useSelector((store) => store.auth.token);
  const [books, setBooks] = useState([]);

  const { search } = useQueryParams()


  const navigate = useNavigate();

  // const [params] = useSearchParams();

  // const {search} = useLocation()
  // const urlSearchParams = new URLSearchParams(search)
  // const params = Object.fromEntries(urlSearchParams.entries());

  // console.log(params)

  useEffect(() => {
    getAllBooks();
  }, [search]);

  async function getAllBooks() {
    const booksResponse = await getBooks(token, search);
    if (!booksResponse.errors) setBooks(booksResponse);
  }

  function navigateAddBook() {
    navigate("/add-new-book");
  }

  return (
    <Layout>
      <div className="container-fluid">
        <div className="card mt-3 less-opaque">
          <div className="card-header row">
            <h2 className="col-12 col-sm-6 col-md-8 col-lg-10">Books</h2>
            <button className="btn btn-primary col-12 col-sm-6 col-md-4 col-lg-2" onClick={navigateAddBook}>
              Add new book
            </button>
          </div>
          <div className="card-body">
            <div className="row">
              {books.length ? (
                books.map((book) => (
                  <div className="p-2 col-6 col-md-4" key={book._id}>
                    <BookCard book={book} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p>
                    <b>There are no books </b>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BooksPage;
