import { json, Router } from "express";
import {
  resolveIndexByTaskId,
  resolveIndexByTaskStatus,
} from "../utils/middleware.js";
import { getTasksById, getTaskByStatus } from "../handlers/tasks.js";
import { mockTasks } from "../utils/constants.js";
import {
  createTaskValidationSchema,
  getTaskValidationSchema,
} from "../utils/validationSchema.js";
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
} from "express-validator";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to taskify!");
});

router.get("/api/tasks", checkSchema(getTaskValidationSchema), (req, res) => {
  const result = validationResult(req);
  console.log(result);
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

router.post("/tasks", checkSchema(createTaskValidationSchema), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newTask = {
    id: mockTasks.at(-1).id + 1,
    taskName: req.body.taskName,
    status: req.body.status,
  };

  mockTasks.push(newTask);
  return res.status(201).json(newTask);
});

export default router;
