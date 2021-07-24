const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Text is required"],
      //unique: true, //I commented out because same task maybe assign to multile members
    },
    dueDate: {
      type: Date,
      trim: true,
      required: [true, "Due date is required"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
