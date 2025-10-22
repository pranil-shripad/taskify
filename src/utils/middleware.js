import { mockTasks } from "./constants.js";

export const resolveIndexByTaskId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedTaskId = parseInt(id);
  if (isNaN(parsedTaskId)) return res.sendStatus(400);
  const findTaskIndex = mockTasks.findIndex((task) => task.id === parsedTaskId);
  if (findTaskIndex === -1) return res.sendStatus(404);
  req.findTaskIndex = findTaskIndex;
  next();
};

export const resolveIndexByTaskStatus = (req, res, next) => {
  const {
    params: { status },
  } = req;
  const findTaskStatus = mockTasks.find(
    (task) => task.status === status
  );
  if (findTaskStatus === -1) return res.sendStatus(404);
  req.findTaskStatus = findTaskStatus;
  next();
};
