import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required for task"],
    },
    subTitle: {
      type: String,
      required: [true, "subtitle is required for task"],
    },
    reminderDate: {
      type: Date,
      default: Date.now(),
      required: [true, "Reminder date is required for task"],
    },
    description: {
      type: String,
      minlen: [15, "minimum length of 15 char is required"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["important", "not-important", "very-important"],
      default: "very-important",
    },
  },
  { timestamps: true }
);

export default model("Task", taskSchema);
