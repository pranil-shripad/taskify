import { mockNotes, mockTasks } from "./constants.js";
import { Task } from "../mongoose/schemas/tasksSchema.js";

export const resolveIndexByTaskId = async (req, res, next) => {
  const {
    params: { taskId },
  } = req;
  const parsedTaskId = parseInt(taskId);
  if (isNaN(parsedTaskId)) return res.sendStatus(400);
  const task = await Task.findOne({ taskId: parsedTaskId });
  if (!task) return res.sendStatus(404);
  req.task = task;
  next();
};

export const resolveIndexByTaskStatus = async (req, res, next) => {
  try {
    const {
      query: { status },
    } = req;

    const filter = status ? { status } : {};

    console.log("🔍 Status from query:", status);
    console.log("🧮 Filter being used:", filter);

    const findTaskStatus = await Task.find(filter);
    console.log("📦 Found tasks:", findTaskStatus);

    if (!findTaskStatus || findTaskStatus.length === 0) {
      return res
        .status(404)
        .json({ message: `No tasks found with status: ${status}` });
    }
    req.findTaskStatus = findTaskStatus;
    next();
  } catch (err) {
    next(err);
  }
};

export const resolveIndexByNotesId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedNoteId = parseInt(id);
  if (isNaN(parsedNoteId)) return res.sendStatus(400);
  const findNoteIndex = mockNotes.findIndex((note) => note.id === parsedNoteId);
  if (findNoteIndex === -1) return res.sendStatus(404);
  req.findNoteIndex = findNoteIndex;
  next();
};
