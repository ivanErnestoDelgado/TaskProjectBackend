const jwt= require('jsonwebtoken');
const {UnauthorizedError}=require('../utils/errors')

const authMiddleware=(req, res, next) => {
    const authHeader=req.headers.authorization;


    if(!authHeader || !authHeader.startsWith("Bearer ")){
        //Pasa directo al error handler si el token no es proporcionado
        return next(new UnauthorizedError("Token not provided"));
    }

    const token= authHeader.split(" ")[1];

    try {
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        req.user=decoded;
        next();

    } catch (error) {
        //Si el token no pasa la prueba se pasa al error handler como token invalido
        return  next(new UnauthorizedError("Invalid Token"));
    }

};

module.exports= authMiddleware;