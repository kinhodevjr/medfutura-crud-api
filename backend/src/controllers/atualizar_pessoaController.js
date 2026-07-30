const db = require("../database/connection.js")

async function atualizar_pessoa(req, res) {
    const id = req.params.id;
    let { apelido, nome, nascimento, stack } = req.body;

    // 1. mesma validação de campos obrigatórios do criar_pessoa
    if (!apelido || !nome || !nascimento) {
        return res.status(422).json({
            mensagem: "Preencha todos os campos, são obrigatorios!"
        })
    }

    if (apelido.length > 32) {
        return res.status(422).send("Quantidade de caracter invalido, Coloque menos de 32!")
    }

    if (nome.length > 100) {
        return res.status(422).send("A quantidade de caracter tem que ser menos de 100!")
    }

    const regexData = /^\d{4}-\d{2}-\d{2}$/;
    if (!regexData.test(nascimento)) {
        return res.status(422).send("Data de nascimento invalida! formato: AAAA-MM-DD")
    }

    if (stack !== undefined && stack !== null) {
        if (!Array.isArray(stack)) {
            return res.status(422).json({
                mensagem: "A stack deve ser um vetor de string!"
            })
        }
        for (var i = 0; i < stack.length; i++) {
            var item = stack[i];
            if (!item) {
                return res.status(422).json({
                    mensagem: `O item ${i} da stack, não pode ser vazio!`
                })
            }
            if (typeof item !== "string") {
                return res.status(422).json({
                    mensagem: `O item ${i} deve ser uma String!`
                })
            }
            if (item.length > 32) {
                return res.status(422).send("A stack ultrapassou o limite de caracter, coloque menos de 32!")
            }
        }
    }

    // verificar se existe outra pessoa com mesmo apelido para nao ter conflito

    const verificar_apelido = await db.query(`SELECT * FROM pessoas WHERE id = $1 AND $2`, [apelido, id])
    if (verificar_apelido.rows.length !== 0){
        return res.status(422).json({
            mensagem: "apelido pertence a outra pessoa!"
        })
    }
        
    const resultado = await db.query(`UPDATE pessoas SET apelido = $1, nome = $2, nascimento = $3, stack = $4 WHERE id = $5 RETURNING id, apelido, nome, nascimento, stack`, [apelido, nome, nascimento, stack || null, id])
    if (resultado.rows.length === 0) {
    return res.status(422).json({
        mensagem: "Pessoa não encontrada!"
    })
}

    return res.status(200).json(resultado.rows[0]);





}
 module.exports = {
        atualizar_pessoa
 }