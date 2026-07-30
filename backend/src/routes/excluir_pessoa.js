const express = require("express");
const router = express.Router();
const delete_person = require("../controllers/excluir_pessoa")

router.delete("/pessoas/:id", delete_person.excluir_pessoa)

module.exports = router;