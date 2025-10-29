import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const autoIncrement = AutoIncrementFactory(mongoose);

const TaskSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.Number,
    unique: true,
  },

  taskName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },

  status: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

TaskSchema.plugin(autoIncrement, { inc_field: "taskId" });

export const Task = mongoose.model("Task", TaskSchema);
