import express from "express";
import routes from "./src/routes/index.js";
import tasksRouter from "./src/routes/tasks.js";
import notesRouter from "./src/routes/notes.js";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/taskify")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(`Error: ${err}`));

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(routes);

app.use("/api", tasksRouter);
app.use("/api", notesRouter);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
