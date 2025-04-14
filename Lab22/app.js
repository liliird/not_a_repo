const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const imageRoutes = require("./routes/image.routes");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const fileFilter = (req, file, cb) => {
  cb(null, ["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype));
};

const dropboxRoutes = require("./routes/dropbox.routes");
app.use("/dropbox", dropboxRoutes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter }).single("archivo"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/imagenes", imageRoutes);

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));

const Image = require("./models/image.model");

app.get("/", (req, res) => {
  const imagenes = Image.fetchAll();
  res.render("index", { imagenes });
});
