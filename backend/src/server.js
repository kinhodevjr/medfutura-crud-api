const app = require("./app"); 
const PORT = process.env.PORT || 3000;
const pool = require("./database/connection");

pool.connect().then(()=>console.log("banco de dados conectado!")).catch((err)=>console.log(err));

app.listen(PORT, () => {
    console.log(`Servidor Iniciado, rodando na porta ${PORT}`)
});