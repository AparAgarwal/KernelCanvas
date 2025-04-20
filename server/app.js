import express from "express";
import cors from "cors";

import errorHandler from "./middlewares/errorHandlerMiddleware.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  return res.status(200).json({ status: "ok" });
});

// error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
