const db = require("../database/connection.js")
async function buscar_termo(req, res) {
    const termo = req.query.t;
    console.log("termo recebido:", JSON.stringify(termo));

    if (!termo) {
        return res.status(400).json({
            mensagem: "O termo de busca é obrigatório."
        });
    }

    const termoBusca = `%${termo}%`;
    console.log("termoBusca:", termoBusca);

    const resposta = await db.query(
        `SELECT * FROM pessoas 
         WHERE apelido LIKE $1 
            OR nome LIKE $1 
            OR EXISTS (SELECT 1 FROM unnest(stack) AS elemento WHERE elemento LIKE $1)`,
        [termoBusca]
    );

    console.log("linhas encontradas:", resposta.rows.length);

    return res.status(200).json(resposta.rows);
}

module.exports = {
    buscar_termo
}