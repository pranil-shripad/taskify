import { Router } from "express";
import { mockNotes } from "../utils/constants.js";

const router = Router();

router.get("/notes", (req, res) => {
  return res.send(mockNotes);
});

router.post("/notes/new", (req, res) => {
  const {
    body: { title, content, tags },
  } = req;
});

router.post("/notes/search", (req, res) => {
  const {
    body: { keyword },
  } = req;
  if (!keyword) return res.status(400).send("Keyword is required!");
  const lowerKeyword = keyword.toLowerCase();
  const result = mockNotes.filter((task) => {
    return (
      task.title.toLowerCase().includes(lowerKeyword) ||
      task.content.toLowerCase().includes(lowerKeyword) ||
      task.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword))
    );
  });
  return res.status(200).send(result);
});

export default router;
