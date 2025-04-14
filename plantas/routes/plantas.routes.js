const express = require("express");
const router = express.Router();

const isAuth = require("../util/is-auth");
const canView = require("../util/canViewPlantas");
const canCreate = require("../util/canCreatePlantas");

const plantas_controller = require("../controllers/plantas.controller");

//router.get es para registrar un middleware para peticiones HTTP GET
router.get("/agregar", isAuth, canCreate, plantas_controller.get_agregar);
router.get("/add", isAuth, canCreate, plantas_controller.get_agregar);

//router.post es para registrar un middleware para peticiones HTTP POST
router.post("/agregar", isAuth, canCreate, plantas_controller.post_agregar);

router.get("/regar", isAuth, plantas_controller.get_regar);

router.get("/:id", isAuth, canView, plantas_controller.get_root);
router.get("/", isAuth, canView, plantas_controller.get_root);

module.exports = router;
