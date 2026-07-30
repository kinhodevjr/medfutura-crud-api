const db = require("../database/connection")

async function excluir_pessoa(req, res) {
    const id = req.params.id
    
    const resultado = await db.query(`SELECT * FROM pessoas WHERE id = $1`, [id])
    console.log(resultado.rows)

    if (resultado.rows.length !== 1){
        return res.status(400).json({
            mensagem: "Usuario nao existe!"
        })
    }

    await db.query(`DELETE FROM pessoas WHERE id = $1`,[id])
    return res.status(204).json({
        mensagem: "Pessoa Excluida!"
    })

}

module.exports = {
    excluir_pessoa
}