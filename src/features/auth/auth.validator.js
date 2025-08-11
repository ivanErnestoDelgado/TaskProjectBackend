const { password } = require('pg/lib/defaults');
const { z }=require('zod');

const emailValidator=z.email("Invalid email format");
const passwordValidator=z.string().min(6,"Password must be a least 6 characters long");

const registerSchema=z.object({
    email: emailValidator,
    password: passwordValidator,
    name: z.string().min(1,"Name is required").max(100,"Max number of allowed characters is 100")
});

const loginSchema=z.object({
    email:emailValidator,
    password:passwordValidator
});

module.exports={
    registerSchema,
    loginSchema
}