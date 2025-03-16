const express = require("express");
const router = express.Router();

router.get("/", (request, response, next) => {
  response.sendFile("about.html", { root: "./public" });
});

// Ruta adicional para demostrar múltiples rutas
router.get("/lab11", (request, response, next) => {
  response.send(
    "<h1>Laboratorio 11</h1><p>Este es un laboratorio de la asignatura TC2005B Construcción de software y toma de decisiones</p><a href='/about'>Volver</a>"
  );
});

module.exports = router;
