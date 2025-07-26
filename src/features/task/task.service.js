const prisma= require('../../shared/config/db');

//Funciones auxiliares
function idsAreNotEqual(taskUserId, requestUserId) {
    return taskUserId !== requestUserId;
}


//Funciones que son invocadas en su respectivo controlador
const getTasks=async (userId) => {
    return await prisma.task.findMany({
        where:{userId:userId},
        orderBy:{createdAt:"desc"},
    });
};

const getSpecificTask=async (taskId, requestUserId) => {
    const task = await prisma.task.findUnique({
        where:{
            id:taskId,
        }
    });
    //sacamos la id del usuario de la task para comparar y posteriormente saber si coinciden los usuarios
    const taskUserId=task.userId;

    if (!task){
        throw new Error("Tarea inexistente");
    }

    if (idsAreNotEqual(taskUserId, requestUserId)) {
        throw new Error("Usuario no autorizado");
    }

    return task;
}

const createTask= async (data,userId) => {
    const {title,description}=data;
    return await prisma.task.create({
        data:{
            title,
            description,
            userId,
        },
    });
};


const updateTask=async (requestUserId,taskId,data) => {
    
    const task = await prisma.task.findUnique({
        where:{id:taskId},
    });
    
    const taskUserId=task.userId;

    if (!task){
        throw new Error("Tarea inexistente")
    }

    if (idsAreNotEqual(taskUserId, requestUserId)) {
        throw new Error("Usuario no autorizado");
    }
    
    return await prisma.task.update({
        where:{id:taskId},
        data,
    })
};

const deleteTask=async (requestUserId,taskId) => {
    const task = await prisma.task.findUnique({
        where:{id:taskId},
    });

    const taskUserId=task.userId;

    if (!task){
        throw new Error("Tarea inexistente")
    }

    if (idsAreNotEqual(taskUserId, requestUserId)) {
        throw new Error("Usuario no autorizado");
    }
    
    await prisma.task.delete({
        where:{id:taskId},
    });

};


module.exports={
    createTask,
    getTasks,
    getSpecificTask,
    deleteTask,
    updateTask,
}

