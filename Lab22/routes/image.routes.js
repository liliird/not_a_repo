const express = require("express");
const router = express.Router();
const imageController = require("../controllers/image.controller");

router.get("/subir", imageController.getUploadForm);
router.post("/agregar", imageController.postImage);
router.get("/galeria", imageController.getGallery);

module.exports = router;
