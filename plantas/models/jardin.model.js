const db = require("../util/database");

module.exports = class Jardin {
  //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
  constructor(mi_user_id, mi_planta_id) {
    this.user_id = mi_user_id;
    this.planta_id = mi_planta_id;
  }

  //Este método servirá para guardar de manera persistente el nuevo objeto.
  save() {
    return db.execute(
      "INSERT INTO jardin(id_usuario, id_planta) VALUES (?, ?)",
      [this.user_id, this.planta_id]
    );
  }

  //Este método servirá para devolver los objetos del almacenamiento persistente.
  static fetchAll(user_id) {
    return db.execute(
      `SELECT p.id, p.nombre, j.created_at 
            FROM jardin j, plantas p 
            WHERE j.id_planta=p.id AND j.id_usuario = ?`,
      [user_id]
    );
  }
};
