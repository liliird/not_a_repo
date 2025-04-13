const imagenes = [];

module.exports = class Image {
  constructor(ruta, descripcion) {
    this.ruta = ruta;
    this.descripcion = descripcion;
  }

  save() {
    imagenes.push(this);
  }

  static fetchAll() {
    return imagenes;
  }
};
