const express = require("express");

const router = express.Router();

const html_header = ``;
const html_footer = ``;

const plantas = [];

//router.get es para registrar un middleware para peticiones HTTP GET
router.get("/agregar", (request, response, next) => {
  response.render("agregar_planta");
});

//router.post es para registrar un middleware para peticiones HTTP POST
router.post("/agregar", (request, response, next) => {
  console.log(request.body);
  plantas.push(request.body.nombre);
  let html = html_header;
  html += `<div class="columns">`;
  for (let planta of plantas) {
    html += `<div class="column">`;
    html += `<div class="card">
        <div class="card-content">
          <div class="content">`;
    html += planta;
    html += `</div>
                </div>
              </div>
            </div>`;
  }
  html += `</div>`;
  html += html_footer;
  response.send(html);
});

const path = require("path");

router.get("/regar", (request, response, next) => {
  response.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
