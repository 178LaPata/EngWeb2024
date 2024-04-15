const pessoa = require('../models/pessoa')

module.exports.list = () => {
    return pessoa
        .find()
        .sort({nome: 1})
        .exec()
}

module.exports.findById = id => {
    return pessoa
        .findOne({_id: id})
        .exec()
}

module.exports.insert = pessoa => {
    return pessoa.create(pessoa)
}

module.exports.updatePessoa = (id, pessoa) => {
    return pessoa.updateOne({_id: id}, pessoa);
}

module.exports.removePessoa = id => {
    return pessoa.deleteOne({_id: id});
}

module.exports.desportos = () => {
    return pessoa
        .distinct("desporto")
        .exec()
}