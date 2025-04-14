const Plantas = require("../models/planta.model");
const Jardin = require("../models/jardin.model");

exports.get_agregar = (request, response, next) => {
  console.log(request.session.username);
  Plantas.fetchAll()
    .then(([plantas, fieldData]) => {
      response.render("agregar_planta", {
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || "",
        csrfToken: request.csrfToken(),
        privilegios: request.session.privilegios || [],
        plantas: plantas,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.post_agregar = (request, response, next) => {
  console.log(request.body);
  const mi_planta = new Jardin(request.session.user_id, request.body.id_planta);
  mi_planta
    .save()
    .then(() => {
      request.session.info = `La planta ${mi_planta.nombre} se ha creado`;
      response.redirect("/plantas/");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.get_root = (request, response, next) => {
  console.log(request.session.privilegios);

  const mensaje = request.session.info || "";
  if (request.session.info) {
    request.session.info = "";
  }

  Jardin.fetchAll(request.session.user_id)
    .then(([rows, fieldData]) => {
      console.log(fieldData);
      console.log(rows);
      response.render("lista_plantas", {
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || "",
        plantas: rows,
        info: mensaje,
        privilegios: request.session.privilegios || [],
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.get_regar = (request, response, next) => {
  const path = require("path");
  response.sendFile(path.join(__dirname, "..", "views", "index.html"));
};
