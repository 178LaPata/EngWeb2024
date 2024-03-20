var express = require('express');
var router = express.Router();
var Compositor = require('../controllers/compositor')

router.get('/compositores', function(req, res) {
  Compositor.list()
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(521).jsonp(erro))
});

router.get('/compositores/:id', function(req, res) {
  Compositor.findById(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(522).jsonp(erro))
});

router.post('/compositores', function(req, res) {
  Compositor.insert(req.body)
    .then(dados => res.status(201).jsonp(dados))
    .catch(erro => res.status(523).jsonp(erro))
});

router.put('/compositores/:id', function(req, res) {
  Compositor.updateCompositor(req.params.id, req.body)
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(524).jsonp(erro))
});

module.exports = router;
