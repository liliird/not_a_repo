const express = require("express");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

// Configuración de almacenamiento
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) =>
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    ),
});

// Filtro para solo imágenes
const fileFilter = (req, file, cb) => {
  const tiposPermitidos = ["image/png", "image/jpg", "image/jpeg"];
  cb(null, tiposPermitidos.includes(file.mimetype));
};

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("archivo")
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.get("/", (req, res) => {
  fs.readdir("uploads", (err, archivos) => {
    const imagenes = archivos.filter((name) => /\.(jpg|jpeg|png)$/.test(name));
    res.render("index", { imagenes });
  });
});

app.post("/archivo", (req, res) => {
  if (!req.file) {
    return res.send(
      "Tipo de archivo no permitido o no se subió ningún archivo."
    );
  }
  res.redirect("/");
});

app.listen(3000, () =>
  console.log("Servidor corriendo en http://localhost:3000")
);
