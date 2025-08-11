const { z } = require('zod');
const {isCuid}= require('../../shared/utils/globalValidators')

//objetos zod con validaciones predefinidas para no repetir codigo xdxdxd
const titleStandarZodValidator=z.string().min(1,"The title is required").max(100,"Max number of allowed title characters is 100");

const descriptionStandarZodValidator=z.string().max(500,"Max number of allowed description characters is 500");

const numberFromStringZodValidator=z.string().regex(/^\d+$/,"THe input must be a number");


//Esquemas para validacion del body y query params en las request
const createTaskSchema= z.object({
    title: titleStandarZodValidator,
    description: descriptionStandarZodValidator.optional(),
});

const updateTaskSchema=z.object({
    title: titleStandarZodValidator.optional(),
    description: descriptionStandarZodValidator.optional(),
    completed: z.boolean().optional(),
});

const getTaskQuerySchema=z.object({
    completed: z.enum(['true','false'],"Completed query param must be 'true' or 'false'").optional(),
    search: z.string().max(100,"Max number of allowed search characters is 100").optional(),
    page: numberFromStringZodValidator.optional(),
    limit: numberFromStringZodValidator.optional(),
});

const idParamSchema=z.object({
    id: z.string().refine(isCuid,{message: "Invalid CUID format"})
});

module.exports={
    createTaskSchema,
    updateTaskSchema,
    getTaskQuerySchema,
    idParamSchema
};