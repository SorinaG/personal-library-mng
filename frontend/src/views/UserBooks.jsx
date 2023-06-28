import React, { useState } from "react";
import Layout from "../components/Layout";
import { getUserBooks } from "../api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Rating from "../components/Rating";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function UserBooksPage() {
  const token = useSelector((store) => store.auth.token);
  const [bookLinks, setBookLinks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState(null)

  const navigate = useNavigate();

  async function dropdownUserBooks() {
    const bookLinksResponse = await getUserBooks(token, selectedStatus, selectedGenre)
    setBookLinks(bookLinksResponse)
  }

  useEffect(() => {
    dropdownUserBooks()
  }, [selectedStatus, selectedGenre])

  const handleSelectedStatus = (status) => {
    setSelectedStatus(status);
  };

  const handleSelectedGenre = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-3">
            <div className="card">
              <div className="card-body row">
                <div className="col-12 col-sm-6 col-md-4">
                  <DropdownButton
                    title={selectedStatus ?? 'Status'}
                    className="button-w-100"
                    onSelect={handleSelectedStatus}
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

                <div className="col-12 col-sm-6 col-md-4 mt-2 mt-sm-0">
                  <DropdownButton
                    title={selectedGenre ?? 'Genre'}
                    className="button-w-100"
                    onSelect={handleSelectedGenre}
                  >
                    <Dropdown.Item eventKey="Mystery">Mystery</Dropdown.Item>
                    <Dropdown.Item eventKey="Comedy">Comedy</Dropdown.Item>
                    <Dropdown.Item eventKey="Self-help">Self-help</Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            {bookLinks?.map((bookLink, index) => (
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
                      <p>{bookLink?.book[0].title}</p>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="fw-bold">Author</label>
                      <p>{bookLink?.book[0].author}</p>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="fw-bold">Genre</label>
                      <p>{bookLink?.book[0].genre}</p>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="fw-bold">Status</label>
                      <p>{bookLink?.status}</p>
                    </div>
                    <div className="col-12">
                      <Rating value={bookLink?.rating} readOnly={true} />
                    </div>
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          navigate(`/book/${bookLink?.bookId}`)
                        }
                      >
                        Edit book
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

export default UserBooksPage;
