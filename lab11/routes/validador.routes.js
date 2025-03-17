const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
const Password = require("../models/password");

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
  }

  const checks = {
    length: /.{8,}/,
    uppercase: /[A-Z]/,
    number: /\d/,
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
  };

  const isValid = Object.values(checks).every((check) => check.test(password));
  const result = isValid ? "Contraseña válida" : "Contraseña inválida";

  const newPassword = new Password(password, result);
  try {
    await newPassword.save();
    response.send(
      `<h1>${result}</h1><p>La contraseña ha sido guardada en la base de datos.</p><a href="/validador">Volver</a>`
    );
  } catch (error) {
    response
      .status(500)
      .send(
        "<h1>Error</h1><p>No se pudo guardar la contraseña.</p><a href='/validador'>Volver</a>"
      );
  }
});

// Mostrar historial de contraseñas
router.get("/history", (request, response, next) => {
  Password.fetchAll()
    .then(([rows]) => {
      let html = "<h1>Historial de Contraseñas</h1><ul>";
      rows.forEach((row) => {
        html += `<li>ID: ${row.id} - ${row.password} - ${row.result} (<a href="/validador/edit/${row.id}">Editar</a>)</li>`;
      });
      html += '</ul><p><a href="/validador">Volver</a></p>';
      response.send(html);
    })
    .catch((err) => {
      console.log(err);
      response
        .status(500)
        .send(
          "<h1>Error</h1><p>No se pudo cargar el historial.</p><a href='/validador'>Volver</a>"
        );
    });
});

// Mostrar formulario para editar una contraseña
router.get("/edit/:id", (request, response, next) => {
  const id = request.params.id;
  Password.fetchOne(id)
    .then(([rows]) => {
      if (rows.length === 0) {
        return response
          .status(404)
          .send(
            "<h1>404</h1><p>Contraseña no encontrada.</p><a href='/validador/history'>Volver</a>"
          );
      }
      const password = rows[0];
      response.send(`
              <h1>Editar Contraseña (ID: ${password.id})</h1>
              <form action="/validador/update" method="POST">
                  <input type="hidden" name="id" value="${password.id}">
                  <label>Contraseña:</label><input type="text" name="password" value="${password.password}" required><br>
                  <label>Resultado:</label><input type="text" name="result" value="${password.result}" required><br>
                  <button type="submit">Actualizar</button>
              </form>
              <p><a href="/validador/history">Volver</a></p>
          `);
    })
    .catch((err) => {
      console.log(err);
      response
        .status(500)
        .send(
          "<h1>Error</h1><p>No se pudo cargar la contraseña.</p><a href='/validador/history'>Volver</a>"
        );
    });
});

// Actualizar una contraseña
router.post("/update", (request, response, next) => {
  const { id, password, result } = request.body;
  Password.update(id, password, result)
    .then(() => {
      response.redirect("/validador/history");
    })
    .catch((err) => {
      console.log(err);
      response
        .status(500)
        .send(
          "<h1>Error</h1><p>No se pudo actualizar la contraseña.</p><a href='/validador/history'>Volver</a>"
        );
    });
});

module.exports = router;
