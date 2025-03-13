const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware para procesar formularios
app.use(express.urlencoded({ extended: false }));
// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

const PORT = 3000;

// Ruta 1: Página principal (GET)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "lab6.html"));
});

// Ruta 2: Página "acerca de" (GET)
app.get("/about", (req, res) => {
  res.send(`
    <h1>Acerca de</h1>
    <p>Esta es una aplicación para validar contraseñas.</p>
    <a href="/">Volver</a>
  `);
});

// Ruta 3: Manejar el formulario (POST)
app.post("/submit", (req, res) => {
  const { password, confirmPassword } = req.body;
  const data = `Password: ${password}, Confirm: ${confirmPassword}\n`;

  fs.appendFile("passwords.txt", data, (err) => {
    if (err) {
      res.status(500).send("Error al guardar los datos");
    } else {
      res.send(`
        <h1>Datos guardados</h1>
        <p>Contraseña: ${password}</p>
        <a href="/">Volver</a>
      `);
    }
  });
});

// 404 para rutas no encontradas
app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Página no encontrada</h1>
    <p>La ruta "${req.url}" no existe.</p>
    <a href="/">Volver al inicio</a>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
