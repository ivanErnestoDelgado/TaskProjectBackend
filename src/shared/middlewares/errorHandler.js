const {HttpError}=require('../utils/errors')

const errorHandler= (err,req,res,next) => {
    if(err instanceof HttpError){
        return res.status(err.status).json({
            succes:false,
            message: err.message,
            ...(err.errors ? {errors:err.errors}:{})
        });
    }

    console.error(err.stack);

    return res.status(500).json({
        succes:false,
        message: "Internal server error"
    });
}


module.exports=errorHandler;