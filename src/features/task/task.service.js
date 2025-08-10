const prisma= require('../../shared/config/db');
const {ForbiddenError,NotFoundError}=require('../../shared/utils/errors')

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
        throw new NotFoundError("Task not found");
    }

    //sacamos la id del usuario de la task para comparar y posteriormente saber si coinciden los usuarios
    const taskUserId=task.userId;


    if (idsAreNotEqual(taskUserId, requestUserId)) {
        throw new ForbiddenError("The consulted task not belongs you");
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
    

    if (!task){
        throw new NotFoundError("Task not found");
    }

    const taskUserId=task.userId;

    if (idsAreNotEqual(taskUserId, requestUserId)) {
        throw new ForbiddenError("The consulted task not belongs you");
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


    if (!task){
        throw new NotFoundError("Task not found");
    }

    const taskUserId=task.userId;

    if (idsAreNotEqual(taskUserId, requestUserId)) {
        throw new ForbiddenError("The consulted task not belongs you");
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

