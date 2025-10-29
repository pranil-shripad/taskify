import { Router } from "express";
import {
  resolveIndexByTaskId,
  resolveIndexByTaskStatus,
} from "../utils/middleware.js";
import { mockTasks } from "../utils/constants.js";
import { createTaskValidationSchema } from "../utils/validationSchema.js";
import { validationResult, checkSchema, matchedData } from "express-validator";
import { Task } from "../mongoose/schemas/tasksSchema.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to taskify!");
});

// router.get(
//   "/api/tasks",
//   checkSchema(getTaskByStatusValidationSchema),
//   (req, res) => {
//     const result = validationResult(req);
//     const {
//       query: { status },
//     } = req;
//     if (status) {
//       return res.send(mockTasks.filter((task) => task.status === status));
//     }
//     return res.send(mockTasks);
//   }
// );

router.get("/tasks", resolveIndexByTaskStatus, (req, res) => {
  const { findTaskStatus } = req;
  return res.send(findTaskStatus);
});

router.get("/api/tasks/:taskId", resolveIndexByTaskId, async (req, res) => {
  const { task } = req;
  return res.send(task);
});

router.post(
  "/tasks/create",
  checkSchema(createTaskValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const data = matchedData(req);
    console.log(data);
    const newTask = new Task(data);
    try {
      const savedNote = await newTask.save();
      return res.status(200).send(savedNote);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }

    //   const newTask = {
    //     id: mockTasks.at(-1).id + 1,
    //     taskName: req.body.taskName,
    //     status: req.body.status,
    //   };

    //   mockTasks.push(newTask);
    //   return res.status(201).json(newTask);
  }
);

router.put("/tasks/:id", resolveIndexByTaskId, (req, res) => {
  const { body, findTaskIndex } = req;
  mockTasks[findTaskIndex] = { id: mockTasks[findTaskIndex].id, ...body };
  return res.sendStatus(200);
});

router.patch("/tasks/:id", resolveIndexByTaskId, (req, res) => {
  const { body, findTaskIndex } = req;
  mockTasks[findTaskIndex] = { ...mockTasks[findTaskIndex], ...body };
  return res.sendStatus(200);
});

router.delete("/tasks/:id", resolveIndexByTaskId, (req, res) => {
  const { findTaskIndex } = req;
  mockTasks.splice(findTaskIndex, 1);
  return res.sendStatus(200);
});

export default router;
