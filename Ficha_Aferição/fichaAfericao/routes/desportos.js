var express = require('express');
var router = express.Router();
var Desporto = require('../controllers/desporto')

router.get('/desportos', function(req, res) {
    Desporto.list()
        .then(dados => res.status(200).jsonp(dados))
        .catch(erro => res.status(521).jsonp(erro))
});

router.get('/desportos/:desporto', function(req, res) { 
    Desporto.listDesportos(req.params.desporto)
        .then(dados => res.status(200).jsonp(dados))
        .catch(erro => res.status(522).jsonp(erro))
});

module.exports = router;