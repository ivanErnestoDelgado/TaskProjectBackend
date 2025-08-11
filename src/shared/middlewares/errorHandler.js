const HTTP_STATUS = require('../constants/httpStatusCodes');
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

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        succes:false,
        message: "Internal server error"
    });
}


module.exports=errorHandler;