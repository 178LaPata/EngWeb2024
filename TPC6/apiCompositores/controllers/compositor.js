const compositor = require('../models/compositor')
const Compositor = require('../models/compositor')

module.exports.list = () => {
    return Compositor
        .find()
        .sort({nome: 1})
        .exec()
}

module.exports.findById = id => {
    return Compositor
        .findOne({id: id})
        .exec()
}

module.exports.insert = compositor => {
    return Compositor.create(compositor)
}

module.exports.updateCompositor = id, compositor => {
    return Compositor.updateOne({id: id}, compositor)
}
