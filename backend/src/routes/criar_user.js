const express = require("express");
const router = express.Router();
const created_user = require("../controllers/pessoaController")


router.post("/pessoas", created_user.criar_pessoa);

module.exports = router;