const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Importar rutas
const authRoutes = require('./features/auth/auth.routes');
app.use('/api/auth', authRoutes);

const taskRoutes = require("./features/task/task.routes");

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});