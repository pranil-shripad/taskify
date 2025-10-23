export const createTaskValidationSchema = {
  taskName: {
    notEmpty: {
      errorMessage: "The task Name must not be empty!",
    },
    isString: {
      errorMessage: "Task name should be a string!",
    },
  },
};

export const getTaskValidationSchema = {
    status: {
    notEmpty: {
      errorMessage: "The status of the task should be defined",
    },
    isLength: {
      options: { min: 3, max: 10 },
      errorMessage: "Filter must be 3-10 characters long",
    },
    isIn: {
        options: [["pending", "completed"]],
        errorMessage: "The task can either be pending or completed",
    }
  },
}

