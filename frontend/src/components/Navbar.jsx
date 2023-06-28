import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { searchBooks } from "../api";
import { useNavigate, createSearchParams } from "react-router-dom";
import { logOut } from "../api";

export default function Navbar() {
  const navigate = useNavigate();
  const userRole = useSelector((store) => store.auth.user.role);
  const [searchInputValue, setSearchInputValue] = useState("");

  function logoutAndRedirect() {
    logOut();
    navigate("/login");
  }

  function handleSelectedInput(event) {
    setSearchInputValue(event.target.value);
  }

  function goToBooksPage() {
    navigate({ pathname: "/books", search: createSearchParams({ search: searchInputValue }).toString()});

    // navigate({ pathname: "/books", search: `search=${searchInputValue}` });
    // navigate(`/books?search=${searchInputValue}`);
  }

  // function goToBooksPage() {
  //   navigate({
  //     pathname: '/books',
  //     search: createSearchParams({ query: "we" }).toString(),
  //   })
  // }

  return (
    <nav className="navbar navbar-expand-lg bg-light rounded-bottom-5">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a
          className="navbar-brand nav-link cursor"
          onClick={() => navigate("/books")}
        >
          Personal Library Management
        </a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link cursor" onClick={() => navigate("/me")}>
                Me
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link cursor"
                onClick={() => navigate("/mybooks")}
              >
                My books
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link cursor"
                onClick={() => navigate("/quotes")}
              >
                Quotes
              </a>
            </li>
            {userRole == "admin" ? (
              <li className="nav-item">
                <a
                  className="nav-link cursor"
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </a>
              </li>
            ) : null}
          </ul>
          <div className="d-flex">
            <input
              className="form-control me-2"
              placeholder="Search"
              value={searchInputValue}
              onChange={handleSelectedInput}
            />
            <button className="btn btn-outline-success" onClick={goToBooksPage} type="button">
              Search
            </button>
          </div>
        </div>
        <button className="btn btn-secondary ms-2" onClick={logoutAndRedirect}>
          Logout
        </button>
      </div>
    </nav>
  );
}
