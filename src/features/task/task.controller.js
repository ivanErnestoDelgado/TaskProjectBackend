const HTTP_STATUS = require('../../shared/constants/httpStatusCodes');
const taskService = require('./task.service');


// Obtener todas las tareas del usuario autenticado
const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks(req.user.userId,req.query);
    res.status(HTTP_STATUS.OK).json(tasks);
  } catch (err) {
    next(err);
  }
};

// Obtener una tarea en especifico
const getSpecificTask=async (req,res,next) => {
  try {
    const { id }=req.params;
    const task= await taskService.getSpecificTask(id,req.user.userId);
    res.status(HTTP_STATUS.OK).json(task);
  } catch (err) {
    next(err);
  }
}

// Crear una nueva tarea
const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask( req.body, req.user.userId);
    res.status(HTTP_STATUS.CREATED).json(task);
  } catch (err) {
    next(err);
  }
};

// Actualizar una tarea existente
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTask = await taskService.updateTask(req.user.userId, id, req.body);
    res.status(HTTP_STATUS.200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

// Eliminar una tarea
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await taskService.deleteTask(req.user.userId, id);
    res.status(HTTP_STATUS.NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getSpecificTask,
};
