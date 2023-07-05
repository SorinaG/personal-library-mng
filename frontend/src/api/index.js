export const createBook = async (token, book) => {
  let requestBody = book
  try {
    let response = await fetch("http://localhost:3000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    response = await response.json();

    return response;
  } catch (err) {
    console.error(err);
  }
};

export const login = async (email, password) => {
  let requestBody = { email, password };

  try {
    let response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    response = await response.json();
    if (response.token) {
      localStorage.setItem("sorinaLibraryToken", response.token);
    }
    if(response.user) {
      localStorage.setItem("sorinaLibraryUser", JSON.stringify(response.user))
    }
    return response
  } catch (err) {
    console.error(err);
  }
};

export const changePassword = async (token, oldPassword, newPassword) => {
  let requestBody = { oldPassword, newPassword };

  try {
    let response = await fetch(`http://localhost:3000/auth/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    response = await response.json();
  } catch (err) {
    console.error(err)
  }
};

export const createAccount = async (username, email, password) => {
  let requestBody = { username, email, password };

  try {
    let response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status == 201) {
      return true;
    } else {
      return false;
    }

    // response = await response.json();
  } catch (err) {
    console.error(err)
  }
};

export const getBooks = async (token, search="") => {
  // try {
  //   let response = await fetch("http://localhost:3000/book", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   response = await response.json();
  //   return response;
  // } catch (err) {
  //   console.error(err)
  // }

  try {
    let url = "http://localhost:3000/book?"

    if(search) {
      url += `search=${search}`;
    }

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    response = await response.json();

    return response;
  } catch (err) {
    console.error(err)
  }
};

export const getUserBooks = async (token, status="", genre="") => {
  try {
    let url = `http://localhost:3000/bookLink?`;

    if (status) {
      url += `status=${status}&`;
    }

    if (genre) {
      url += `genre=${genre}&`;
    }

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    response = await response.json();

    return response;
  } catch (err) {
    console.error(err)
  }
};

export const getBookById = async (token, id) => {
  try {
    let response = await fetch(`http://localhost:3000/book/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    response = await response.json();

    return response;
  } catch (err) {
    console.error(err)
  }
};

export const getAllQuotes = async (token) => {
  try {
    let response = await fetch(`http://localhost:3000/bookLink/quotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    response = await response.json();

    return response;
  } catch (err) {
    console.error(err)
  }
};

export const getMe = async (token) => {
  try {
    let response = await fetch(`http://localhost:3000/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    response = await response.json();
    return response;
  } catch (err) {
    console.error(err)
  }
};

export const editBookLink = async (token, bookLink) => {
  let requestBody = bookLink;
  try {
    let response = await fetch(`http://localhost:3000/bookLink`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    response = await response.json();
    return response;
  } catch (err) {
    console.error(err)
  }
};

export const deleteBookLink = async (token, id) => {
  let requestBody = { _id: id };
  try {
    let response = await fetch(`http://localhost:3000/bookLink`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    response = await response.json();
    return response;
  } catch (err) {
    console.error(err)
  }
};

export const createBookLink = async (token, bookLink) => {
  let requestBody = bookLink;
  try {
    let response = await fetch(`http://localhost:3000/bookLink`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    response = await response.json();
    return response;
  } catch (err) {
    console.error(err);
  }
}

export const getBooksForApprove = async (token) => {
  try {
    let response = await fetch(`http://localhost:3000/book/unapproved-books`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    response = await response.json();

    return response;
  } catch (err) {
    console.error(err)
  }
};

export const approveBook = async (token, bookId) => {
  let requestBody = { bookId: bookId };
  try {
    let response = await fetch(`http://localhost:3000/book/approve`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    response = await response.json();

    console.log("response", response)

    return response;
  } catch (err) {
    console.error(err)
  }
}

export const getRandomBooks = async (token) => {
  try {
    let response = await fetch("http://localhost:3000/book/random", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    response = await response.json()

    return response
  } catch(err) {
    console.error(err)
  }
}


export const searchBooks = async (token, searchQuery) => {
  try {
    let response = await fetch(`http://localhost:3000/book?search=${searchQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    response = await response.json();
    return response
  } catch (err) {
    console.error(err)
  }
};

export const deleteBook = async (token, bookId) => {
  try {
    let response = await fetch("http://localhost:3000/book", {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({bookId}),
    })

    response = await response.json()
    return response
  } catch(err) {
    console.error(err)
  }
}

export const logOut = () => {
  localStorage.removeItem("sorinaLibraryToken");
  localStorage.removeItem("sorinaLibraryUser");
};
