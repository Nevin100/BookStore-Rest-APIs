import { v4 as uuidv4 } from "uuid";
import { readData, writeData } from "../utils/fileHandler.js";

// Get All Books
export const getBooks = async (req, res) => {
  try {
    const books = await readData("books");
    if (!books || books.length == 0) {
      return res.status(404).json({ message: "No Book Found", error: true });
    }

    res
      .status(200)
      .json({ message: "All Books Retrieved", error: false, data: books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

// Get Book by ID
export const getBookById = async (req, res) => {
  try {
    const books = await readData("books");
    const book = books.find((book) => book.id === req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found", error: true });
    }

    res.status(200).json({
      message: "The Book retrieved Successfully",
      error: false,
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

// Create Book
export const createBook = async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;

  try {
    const books = await readData("books");

    if (!title || !author || !genre || !publishedYear) {
      return res
        .status(400)
        .json({ message: "Fields can't be empty", error: true });
    }

    const bookExist = books.find((book) => book.title === title);
    if (bookExist) {
      return res
        .status(409)
        .json({ message: "Book Already Exists", error: true });
    }

    const newBook = {
      id: uuidv4(),
      title,
      author,
      genre,
      publishedYear,
      userId: req.user.id,
    };

    books.push(newBook);
    await writeData("books", books);

    res.status(201).json({
      message: "Book Created Successfully",
      error: false,
      data: newBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

// Update Book
export const updateBook = async (req, res) => {
  try {
    const books = await readData("books");
    const bookIndex = books.findIndex((book) => book.id === req.params.id);

    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found", error: true });
    }

    if (books[bookIndex].userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized User", error: true });
    }

    books[bookIndex] = { ...books[bookIndex], ...req.body };
    await writeData("books", books);

    res.status(200).json({
      message: "Book Updated Successfully",
      error: false,
      data: books[bookIndex],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};

// Delete Book
export const deleteBook = async (req, res) => {
  try {
    let books = await readData("books");
    const book = books.find((book) => book.id === req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found", error: true });
    }

    if (book.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized", error: true });
    }

    books = books.filter((b) => b.id !== req.params.id);
    await writeData("books", books);

    res.status(200).json({
      message: "Book Deleted Successfully",
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Issue", error: true });
  }
};
