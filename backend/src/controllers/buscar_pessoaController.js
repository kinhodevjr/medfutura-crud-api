const db = require("../database/connection")

async function buscar_id(req, res) {
    let id = req.params.id
    const resposta = await db.query(`SELECT * FROM pessoas WHERE id = $1`,[id])

    if (resposta.rows.length === 0){
        return res.status(404).send("Id nao encontrado!")
    }

    return res.status(200).json({
        mensagem: resposta.rows
    })
    
    
}

module.exports = {
    buscar_id
}