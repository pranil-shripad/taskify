export const createTaskValidationSchema = {
  taskName: {
    notEmpty: {
      errorMessage: "The task Name must not be empty!",
    },
    isString: {
      errorMessage: "Task name should be a string!",
    },
  },
  status: {
    notEmpty: {
      errorMessage: "The status of the task must not be empty"
    },
    isString:{
      errorMessage: "The status should be a string"
    },
    isIn: {
        options: [["pending", "completed"]],
        errorMessage: "The task can either be pending or completed",
    }
  }
};

export const getTaskByStatusValidationSchema = {
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

