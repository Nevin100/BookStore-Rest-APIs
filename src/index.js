import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import logger from "./middleware/logger.js";
import { handleErrors, notFound } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(logger);

//Routes :
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

//Global Errors Catching :
app.use(notFound);
app.use(handleErrors);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on : ${PORT}`);
});
