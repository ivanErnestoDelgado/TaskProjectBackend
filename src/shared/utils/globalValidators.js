//Archivo para validaciones globales

//CUID *************************************************************
// Expresión regular oficial para CUID v1 (los que empiezan con 'c')
const cuidRegex = /^c[^\s-]{8,}$/;

/**
 * Valida si el string dado es un CUID válido.
 * @param {string} id
 * @returns {boolean}
 */
function isCuid(id) {
    return typeof id === 'string' && cuidRegex.test(id);
}

module.exports = { isCuid };