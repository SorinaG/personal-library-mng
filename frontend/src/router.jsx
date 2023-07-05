import { createBrowserRouter } from "react-router-dom";
import React from "react";
import BooksPage from "./views/BooksPage";
import LoginPage from "./views/auth/LoginPage";
import SignupPage from "./views/auth/SignupPage";
import UserPage from "./views/UserPage";
import UserBooksPage from "./views/UserBooks";
import BookPage from "./views/BookPage";
import QuotesPage from "./views/QuotesPage"
import PrivateRoute from "./components/PrivateRoute";
import NewBookPage from "./views/NewBookPage"
import AdminPage from "./views/AdminPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/books",
    element: (
      <PrivateRoute>
        <BooksPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/me",
    element: (
      <PrivateRoute>
        <UserPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/mybooks",
    element: (
      <PrivateRoute>
        <UserBooksPage />
      </PrivateRoute>
    ),
  },
  // {
  //   path: "/books",
  //   search: "?search=",
  //   element: (
  //     // <PrivateRoute>
  //       <BooksPage />
  //     // </PrivateRoute>
  //   ),
  // },
  {
    path: "/book/:id",
    element: (
      <PrivateRoute>
        <BookPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/quotes",
    element: (
      <PrivateRoute>
        <QuotesPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/add-new-book",
    element: (
      <PrivateRoute>
        <NewBookPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminPage />
      </PrivateRoute>
    ),
  },
]);

export default router;
