const express = require("express");
const router = express.Router();
const search_id = require("../controllers/buscar_pessoaController")

router.get("/pessoas/:id", search_id.buscar_id)

module.exports = router;