const express = require("express"); 
const app = express();

app.use(express.json());

app.use(require("./routes/criar_user"));
app.use(require("./routes/Buscar_pessoa"));
app.use(require("./routes/buscar_termo"));
app.use(require("./routes/atualizar_pessoa"));
app.use(require("./routes/excluir_pessoa"));

module.exports = app;