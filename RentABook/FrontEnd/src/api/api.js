import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const register = async ({ username, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      username,
      password,
    });

    const msg = response.data;

    return msg === "Registration successful" ? "logged-in" : "invalid";
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    const allBooks = response.data;

    return allBooks;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllAuthors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/author`);
    const allAuthors = response.data;

    return allAuthors;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addAbook = async ({ title, genre, availableCopies, id }) => {
  try {
    await axios.post(`${BASE_URL}/addBook`, {
      title,
      genre,
      author: {
        id,
      },
      availableCopies,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addAuthor = async ({ name, lastname }) => {
  try {
    const response = await axios.post(`${BASE_URL}/author/addAuthor`, {
      name,
      lastname,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = async ({ bookId }) => {
  try {
    await axios.delete(`${BASE_URL}/${bookId}`);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateTitle = async ({ title, genre, availableCopies, id }) => {
  try {
    await axios.put(`${BASE_URL}/${id}`, {
      title,
      genre,
      author: {
        id,
      },
      availableCopies,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const borrowBook = async ({ title, genre, availableCopies, id }) => {
  try {
    await axios.put(`${BASE_URL}/${id}`, {
      title,
      genre,
      author: {
        id,
      },
      availableCopies,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
