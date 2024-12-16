const getAllTasks = (req, res) => {
  res.send('Get all tasks')
}

const createTask = (req, res) => {
  res.send('Create task')
}

const getTask = (req, res) => {
  res.json({
    message: 'Get task',
    id: req.params.id,
  })
}

const updateTask = (req, res) => {
  res.json({
    message: 'Update task',
    id: req.params.id,
  })
}

const deleteTask = (req, res) => {
  res.json({
    message: 'Delete task',
    id: req.params.id,
  })
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}