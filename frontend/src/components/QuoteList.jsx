import React from "react";
import QuoteItem from "./QuoteItem";

function QuoteList({ bookLinks }) {

  

  return (
    <>
      <ul className="list-group container mt-3">
        {bookLinks.map((bookLink, outerIndex) =>
          bookLink.quotes.map((quote, innerIndex) => (
            <QuoteItem
              quote={quote}
              title={bookLink.bookId.title}
              author={bookLink.bookId.author}
              bookId={bookLink.bookId._id}
              key={`${outerIndex}-${innerIndex}`}
            />
          ))
        )}
      </ul>
    </>
  );
}

export default QuoteList;
