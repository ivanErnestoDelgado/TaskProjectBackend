const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const validate = require('../../shared/middlewares/validateMiddleware');
const{
    loginSchema,
    registerSchema
}=require('./auth.validator');


router.post(
    '/register',
    validate({
        body:registerSchema
    }), 
    authController.registerUser
);


router.post(
    '/login',
    validate({
        body:loginSchema
    }),
    authController.loginUser
);

module.exports = router;
