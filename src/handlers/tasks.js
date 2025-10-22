import { mockTasks } from "../utils/constants.js";

export const getTasksById = (req, res) => {
  const { findTaskIndex } = req;
  const findTask = mockTasks[findTaskIndex];
  if (!findTask) return res.sendStatus(404);
  return res.send(findTask);
};

export const getTaskByStatus = (req, res) => {
    const { findTaskStatus } = req;
    const findStatus = mockTasks[findTaskStatus];
    if(!findStatus) return res.sendStatus(404);
    return res.send(findStatus);
}
