const express = require("express");
const router = express.Router();
const dropboxController = require("../controllers/dropbox.controller");

router.get("/", dropboxController.getDropboxImages);

module.exports = router;
