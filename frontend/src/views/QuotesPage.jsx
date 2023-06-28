import React, { useState } from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { getAllQuotes } from "../api";
import QuoteList from "../components/QuoteList";
import { useEffect } from "react";

function QuotePage() {
  const token = useSelector((store) => store.auth.token);
  const [bookLinks, setBookLinks] = useState([]);

  useEffect(() => {
    getUserQuotes();
  }, []);

  async function getUserQuotes() {
    const quotesResponse = await getAllQuotes(token);
    setBookLinks(quotesResponse);
  }

  return (
    <Layout>
      <QuoteList bookLinks={bookLinks} />
    </Layout>
  );
}

export default QuotePage;
