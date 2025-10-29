import { Router } from "express";
import { mockNotes } from "../utils/constants.js";
import { resolveIndexByNotesId } from "../utils/middleware.js";


const router = Router();

router.get("/notes", (req, res) => {
  return res.send(mockNotes);
});

router.post("/notes/new", (req, res) => {
  const {
    body: { title, content, tags },
  } = req;

  try {
    const newNote = {
      id: mockNotes.length + 1,
      title,
      content,
      tags,
    };
    if (!newNote) throw new Error("Note creation failed");
    mockNotes.push(newNote);
    return res.status(200).send(mockNotes);
  } catch (err) {
    console.log(err);
  }
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

router.patch("/notes/:id", resolveIndexByNotesId, (req, res) => {
  const { findNoteIndex, body } = req;
  mockNotes[findNoteIndex] = { ...mockNotes[findNoteIndex], ...body };
  return res.sendStatus(200);
});

router.delete("/notes/:id", resolveIndexByNotesId, (req, res) => {
  const { findNoteIndex } = req;
  mockNotes.splice(findNoteIndex, 1);
  return res.sendStatus(200);
});

export default router;
