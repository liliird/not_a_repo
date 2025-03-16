const express = require("express");
const fs = require("fs").promises;
const router = express.Router();

router.get("/", (request, response, next) => {
  response.sendFile("validador.html", { root: "./public" });
});

router.post("/submit", async (request, response, next) => {
  console.log("Datos recibidos en request.body:", request.body);
  const password = request.body.password;
  const confirmPassword = request.body.confirmPassword;

  if (!password || !confirmPassword) {
    return response
      .status(400)
      .send(
        "<h1>Error</h1><p>Faltan datos en el formulario.</p><a href='/validador'>Volver</a>"
      );
  }

  if (password !== confirmPassword) {
    return response
      .status(400)
      .send(
        "<h1>Error</h1><p>Las contraseñas no coinciden.</p><a href='/validador'>Volver</a>"
      );
  } else {
    return response.send(
      "<h1>Muy bien</h1><p>Contraseña recibida</p><a href='/validador'>Volver</a>"
    );
  }

  const checks = {
    length: /.{8,}/,
    uppercase: /[A-Z]/,
    number: /\d/,
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
  };

  const isValid = Object.values(checks).every((check) => check.test(password));
  const result = isValid ? "Contraseña válida" : "Contraseña inválida";

  const data = `${new Date().toISOString()} - Contraseña: ${password} - Resultado: ${result}\n`;
  try {
    await fs.appendFile("./data/passwords.txt", data);
    response.send(
      `<h1>${result}</h1><p>La contraseña ha sido guardada en el servidor.</p><a href="/validador">Volver</a>`
    );
  } catch (error) {
    response
      .status(500)
      .send(
        "<h1>Error</h1><p>No se pudo guardar la contraseña.</p><a href='/validador'>Volver</a>"
      );
  }
});

router.get("/history", (request, response, next) => {
  response.send(
    "<h1>Historial</h1><p>Próximamente: mostrar contraseñas guardadas.</p><a href='/validador'>Volver</a>"
  );
});

module.exports = router;
