const taskService = require('./task.service');


// Obtener todas las tareas del usuario autenticado
const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks(req.user.userId);
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

// Obtener una tarea en especifico
const getSpecificTask=async (req,res) => {
  try {
    const { id }=req.params;
    const task= await taskService.getSpecificTask(id,req.user.userId);
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Error al obtener la tarea"});
  }
}

// Crear una nueva tarea
const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask( req.body, req.user.userId);
    res.status(201).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al crear la tarea" });
  }
};

// Actualizar una tarea existente
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await taskService.updateTask(req.user.userId, id, req.body);
    res.json(updatedTask);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await taskService.deleteTask(req.user.userId, id);
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getSpecificTask,
};
