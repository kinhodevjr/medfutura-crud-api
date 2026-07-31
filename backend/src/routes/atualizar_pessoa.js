const express = require("express");
const router = express.Router();
const update_person = require("../controllers/atualizar_pessoaController");

router.put("/pessoas/:id", update_person.atualizar_pessoa);

module.exports = router;