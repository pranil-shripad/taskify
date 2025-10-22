import express from "express";
const app = express();
const PORT = process.env.port || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to taskify!");
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
