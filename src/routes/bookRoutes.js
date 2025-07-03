import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

//Retrieve All Books :
router.get("/", verifyToken, getBooks);

//Retrieve specific Book :
router.get("/:id", verifyToken, getBookById);

//Create Book :
router.post("/", verifyToken, createBook);

//Update Book :
router.put("/:id", verifyToken, updateBook);

//Delete Book :
router.delete("/:id", verifyToken, deleteBook);

export default router;
