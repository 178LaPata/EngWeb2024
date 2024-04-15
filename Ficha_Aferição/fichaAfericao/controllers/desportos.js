const pessoa = require('../models/pessoa')
const { desportos } = require('./pessoa')

module.exports.list = () => {
    return pessoa
        .distinct("desporto")
        .exec()
}

module.exports.listDesportos = desportos => {
    return pessoa
        .find({desportos: desportos})
        .sort({nome: 1})
        .exec()
}