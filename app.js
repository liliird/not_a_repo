const express = require("express");
const app = express();

/* const path = require('path');
app.use(express.static(path.join(__dirname, 'public'))); 

app.set('view engine', 'ejs');
app.set('views', 'views');
 */
const session = require("express-session");

app.use(
  session({
    secret: "string secreto",
    resave: false,
    saveUninitialized: false,
  })
);

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

/* const usersRoutes = require('./routes/usersRoutes');
app.use('/users', usersRoutes); */

app.use((request, response, next) => {
  console.log("Middleware!");

  //Le permite a la petición avanzar hacia el siguiente middleware
  next();
});

app.get("/ivd", (request, response, next) => {
  response.send("Ya entró");
  next();
});

app.use((request, response, next) => {
  console.log("Otro middleware!");

  //Manda la respuesta
  //response.statusCode = 404;
  response.send("¡Hola mundo!");
});

app.listen(3000);
