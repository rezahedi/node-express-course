const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Task name is required'],
    trim: true,
    maxLength: [50, 'Task name can not be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: Date,
})

module.exports = mongoose.model('Task', TaskSchema)