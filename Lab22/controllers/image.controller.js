const Image = require("../models/image.model");

exports.getUploadForm = (req, res) => {
  res.render("upload");
};

exports.postImage = (req, res) => {
  const descripcion = req.body.descripcion;
  const ruta = req.file ? req.file.path : null;

  if (!ruta) return res.send("No se subió imagen.");

  const nuevaImagen = new Image(ruta, descripcion);
  nuevaImagen.save();

  res.redirect("/imagenes/galeria");
};

exports.getGallery = (req, res) => {
  const imagenes = Image.fetchAll();
  res.render("gallery", { imagenes });
};
