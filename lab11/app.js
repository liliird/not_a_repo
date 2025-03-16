const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rutas definidas en módulos
const aboutRoutes = require("./routes/about.routes.js");
const validadorRoutes = require("./routes/validador.routes.js");
app.use("/about", aboutRoutes);
app.use("/validador", validadorRoutes);

// Manejo de rutas no encontradas (404)
app.use((request, response, next) => {
  response.status(404).send("404 - Ruta no encontrada");
});

app.listen(3000);
