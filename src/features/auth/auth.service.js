const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../../shared/config/db');

const register = async ({ email, password }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('El usuario ya existe');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  return { message: 'Usuario registrado exitosamente', userId: user.id };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Credenciales inválidas');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Credenciales inválidas');

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return { message: 'Login exitoso', token };
};

module.exports = {
  register,
  login,
};