const db = require("../util/database");
const bcrypt = require("bcryptjs");

module.exports = class Usuario {
  constructor(mi_username, mi_password) {
    this.username = mi_username;
    this.password = mi_password;
  }

  //Este método servirá para guardar de manera persistente el nuevo objeto.
  save() {
    return bcrypt
      .hash(this.password, 12)
      .then((password_cifrado) => {
        return db.execute(
          "INSERT INTO usuarios(username, password) VALUES (?, ?)",
          [this.username, password_cifrado]
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Este método servirá para devolver los objetos del almacenamiento persistente.
  static fetchAll() {
    return db.execute("SELECT * FROM usuarios");
  }

  static fetchOne(username) {
    return db.execute("SELECT * FROM usuarios WHERE username = ?", [username]);
  }

  static fetch(username) {
    if (username) {
      return this.fetchOne(username);
    } else {
      return this.fetchAll();
    }
  }

  static getPrivilegios(username) {
    return db.execute(
      `
            SELECT DISTINCT p.nombre
            FROM privilegios p, posee po, roles r, tiene t, usuarios u
            WHERE p.id=po.id_privilegio AND po.id_rol=r.id AND r.id=t.id_rol 
                AND u.id=t.id_usuario AND u.username=?`,
      [username]
    );
  }
};
