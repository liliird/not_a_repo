// models/password.js
const db = require("../util/database");

class Password {
  constructor(password, result) {
    this.password = password;
    this.result = result;
  }

  // Guardar una nueva contraseña
  save() {
    return db.execute(
      "INSERT INTO passwords (password, result) VALUES (?, ?)",
      [this.password, this.result]
    );
  }

  // Obtener todas las contraseñas
  static fetchAll() {
    return db.execute("SELECT * FROM passwords");
  }

  // Obtener una contraseña por ID
  static fetchOne(id) {
    return db.execute("SELECT * FROM passwords WHERE id = ?", [id]);
  }

  // Actualizar una contraseña existente
  static update(id, password, result) {
    return db.execute(
      "UPDATE passwords SET password = ?, result = ? WHERE id = ?",
      [password, result, id]
    );
  }
}

module.exports = Password;
