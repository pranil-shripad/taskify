import express from "express";
import routes from "./src/routes/index.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


app.use(routes);
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
