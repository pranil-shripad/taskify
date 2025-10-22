import { Router } from "express";
import { resolveIndexByTaskId, resolveIndexByTaskStatus } from "../utils/middleware.js";
import { getTasksById, getTaskByStatus } from "../handlers/tasks.js";
import { mockTasks } from "../utils/constants.js";

const router = Router();


router.get("/", (req, res) => {
  res.send("Welcome to taskify!");
});

router.get("/api/tasks", (req, res) => {
  const {
    query: { status },
  } = req;
  if (status) {
    return res.send(mockTasks.filter((task) => task.status === status));
  }
  return res.send(mockTasks);
});

router.get("/api/tasks/:id", resolveIndexByTaskId, getTasksById);

router.get("/api/tasks/:status", resolveIndexByTaskStatus, getTaskByStatus);


export default router;