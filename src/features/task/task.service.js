const prisma= require('../../shared/config/db');

//Funciones auxiliares
function idsAreNotEqual(taskUserId, requestUserId) {
    return taskUserId !== requestUserId;
}


//Funciones que son invocadas en su respectivo controlador
const getTasks=async (userId, requestQuery) => {
    const {completed, search, page = 1 ,limit = 10 }=requestQuery;

    const where = {
        userId,
        ...(completed !== undefined &&{ completed: completed ==='true'}),
        ...(search && {
            title: {
                contains:search,
                mode: 'insensitive',
            }   
        }),
    };

    const skip= (Number(page) - 1) * Number(limit);

    const [tasks, total]= await Promise.all([
        prisma.task.findMany({
            where,
            skip,
            take: Number(limit),
            orderBy: {createdAt: 'desc'}
        }),
        prisma.task.count({where})
    ]);

    return {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total/limit),
        data: tasks
    };
};

const getSpecificTask=async (taskId, requestUserId) => {
    const task = await prisma.task.findUnique({
        where:{
            id:taskId,
        }
    });

    if (!task){
        throw new Error("Tarea inexistente");
    }

    //sacamos la id del usuario de la task para comparar y posteriormente saber si coinciden los usuarios
    const taskUserId=task.userId;


    if (idsAreNotEqual(taskUserId, requestUserId)) {
        throw new Error("Usuario no autorizado");
    }

    return task;
}

const createTask= async (data,userId) => {
    const {title,description}=data;
    //Validaciones
    if(!title){
        throw new Error("Campo title no proporcionado");
    }

    if (typeof title !=='string') {
        throw new Error("El campo title tiene que ser de tipo String");
    }

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
};

