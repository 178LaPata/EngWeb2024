var express = require('express');
var router = express.Router();
var Compositor = require('../controllers/compositor')

// obter todos os compositores
router.get('/compositores', function(req, res) {
  Compositor.list()
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(521).jsonp(erro))
});

// obter um compositor
router.get('/compositores/:id', function(req, res) {
  Compositor.findById(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(522).jsonp(erro))
});

// adicionar um compositor
router.post('/compositores', function(req, res) {
  Compositor.insert(req.body)
    .then(dados => res.status(201).jsonp(dados))
    .catch(erro => res.status(523).jsonp(erro))
});

// atualizar um compositor
router.put('/compositores/:id', function(req, res) {
  Compositor.updateCompositor(req.params.id, req.body)
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(524).jsonp(erro))
});

// remover um compositor
router.delete('/compositores/:id', function(req, res) {
  Compositor.removeCompositor(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(525).jsonp(erro))
});

module.exports = router;
