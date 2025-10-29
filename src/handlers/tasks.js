import { mockTasks } from "../utils/constants.js";
import { Task } from "../mongoose/schemas/tasksSchema.js";

export const getTasksById = async (req, res) => {
  const { task } = req;
  return res.send(task);
};

export const getTaskByStatus = async (req, res) => {
  const { findTaskStatus } = req;
  return res.send(findTaskStatus);
};
