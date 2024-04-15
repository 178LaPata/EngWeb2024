var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')

router.get('/pessoas', function(req, res) {
  Pessoa.list()
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(521).jsonp(erro))
});

router.post('/pessoas', function(req, res) {
  Pessoa.insert(req.body)
    .then(dados => res.status(201).jsonp(dados))
    .catch(erro => res.status(523).jsonp(erro))
});

router.put('/pessoas/:id', function(req, res) {
  Pessoa.updatePessoa(req.params.id, req.body)
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(525).jsonp(erro))
});

router.delete('/pessoas/:id', function(req, res) {
  Pessoa.removePessoa(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(524).jsonp(erro))
});

module.exports = router;
