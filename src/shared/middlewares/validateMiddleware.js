
const { z } = require('zod');
const {BadRequestError}=require('../utils/errors')
//Función que hará de intermediario para validar la parte de la petición que le especifiques (esta body por defecto)
const validate = (schemas = {}) => (req, res, next) => {
  const allErrors = findErrors(schemas, req);

  // Si encontramos errores en alguna fuente, devolvemos respuesta
  if (Object.keys(allErrors).length > 0) {
    return next(new BadRequestError('Validation failed', allErrors));
  }

  next();
};

function findErrors(schemas, req) {
  let allErrors = {};

  // Iteramos sobre cada fuente: body, query, params...
  for (const [source, schema] of Object.entries(schemas)) {
    if (!schema) continue; // si no se definió esquema, se omite

    const data = req[source] ?? {};
    const result = schema.safeParse(data);

    if (!result.success) {
      const { fieldErrors, formErrors } = z.flattenError(result.error);

      // Guardamos solo si hay errores
      if (Object.keys(fieldErrors).length > 0 || formErrors.length > 0) {
        allErrors[source] = { fieldErrors, formErrors };
      }
    }
  }
  return allErrors;
}

module.exports=validate;