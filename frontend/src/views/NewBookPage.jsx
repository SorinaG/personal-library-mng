import { useState } from "react";
import Layout from "../components/Layout";
import { createBook } from "../api";
import { useSelector } from "react-redux";
import useS3 from "../utils/useS3";

function NewBookPage() {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    synopsis: "",
    s3Key: null,
  });

  const [coverImage, setCoverImage] = useState(null);

  const s3 = useS3();

  const token = useSelector((store) => store.auth.token);

  const handleTitleChange = (event) => {
    const title = event.target.value;

    setNewBook((prevState) => {
      return {
        ...prevState,
        title: title,
      };
    });
  };

  const handleAuthorChange = (event) => {
    const author = event.target.value;

    setNewBook((prevState) => {
      return {
        ...prevState,
        author: author,
      };
    });
  };

  const handleReleasedChange = (event) => {
    const released = event.target.value;

    setNewBook((prevState) => {
      return {
        ...prevState,
        year: released,
      };
    });
  };

  const handleGenreChange = (event) => {
    const genre = event.target.value;

    setNewBook((prevState) => {
      return {
        ...prevState,
        genre: genre,
      };
    });
  };

  const handleSynopsisChange = (event) => {
    const synopsis = event.target.value;

    setNewBook((prevState) => {
      return {
        ...prevState,
        synopsis: synopsis,
      };
    });
  };

  const handleCoverUpload = (event) => {
    setCoverImage(event.target.files[0]);
  };

  const uploadToS3 = async () => {
    if (!coverImage) {
      return;
    }

    const s3Key = `${Date.now()}.${coverImage.name}`;

    const params = {
      Bucket: "personal-library-sorina",
      Key: s3Key,
      Body: coverImage,
    };

    const response = await s3.upload(params).promise();
    console.log(response);
    return response.key || "";
  };

  async function submitNewBook() {
    const fileKey = await uploadToS3();

    const newBookBody = {
      ...newBook,
      s3Key: fileKey,
    };

    let book = await createBook(token, newBookBody);
    console.log("book", book);
  }

  return (
    <Layout>
      <div className="container">
        <div className="card mt-3">
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                value={newBook.title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Author</label>
              <input
                className="form-control"
                value={newBook.author}
                onChange={handleAuthorChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Released</label>
              <input
                className="form-control"
                value={newBook.year}
                onChange={handleReleasedChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Genre</label>
              <input
                className="form-control"
                value={newBook.genre}
                onChange={handleGenreChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Synopsis</label>
              <textarea
                className="form-control"
                value={newBook.synopsis}
                onChange={handleSynopsisChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <input
                type="file"
                className="form-control"
                onChange={handleCoverUpload}
              ></input>
            </div>
            <div>
              <button className="btn btn-success" onClick={submitNewBook}>
                Submit
              </button>
            </div>
            <div className="mt-3">
              <p>
                <i>*The book will be visible only after the admin validation</i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NewBookPage;
