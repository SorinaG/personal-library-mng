import React from "react";
import { useNavigate } from "react-router-dom";

function QuoteItem({ quote, author, title, bookId }) {

  const navigate = useNavigate()

  return (
    <>
      <li className="border-bottom border-2 py-2">
        <h5>
          <i>{quote}</i>
        </h5>
        <div onClick={() => navigate(`/book/${bookId}`)} className="cursor fw-bold">{title}</div>
        <div className="">{author}</div>
      </li>
    </>
  );
}

export default QuoteItem;
