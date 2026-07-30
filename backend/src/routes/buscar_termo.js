const express = require("express");
const router = express.Router();
const search_termo = require("../controllers/buscar_termoController")

router.get("/pessoas", search_termo.buscar_termo)

module.exports = router;