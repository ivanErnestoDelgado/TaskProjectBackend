const HTTP_STATUS = require('../../shared/constants/httpStatusCodes');
const authService = require('./auth.service');

const registerUser = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(HTTP_STATUS.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    next(error)
  }
};

module.exports = {
  registerUser,
  loginUser,
};