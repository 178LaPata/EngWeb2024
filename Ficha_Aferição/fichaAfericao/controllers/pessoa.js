const pessoa = require('../models/pessoa')

module.exports.list = () => {
    return pessoa
        .find()
        .sort({nome: 1})
        .exec()
}

module.exports.findById = id => {
    return pessoa
        .findOne({id: id})
        .exec()
}

module.exports.insert = pessoa => {
    if ((pessoa.findOne({id: pessoa.id}).exec()) == null) {
        return pessoa.save()
    }
    return null
}

module.exports.updatePessoas = (id, pessoa) => {
    return pessoa.findOneAndUpdate({id: id}, pessoa, {new: true}).exec()
}

module.exports.removePessoas = id => {
    return pessoa.deleteOne({id: id}).exec()
}  