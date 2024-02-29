var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {
    var regex = /^\/(c\d+)$/
    console.log(req.method + ' ' + req.url)
    var q = url.parse(req.url, true)
    if(regex.test(q.pathname)){
        var path = 'cidades/' + q.pathname.slice(1) + '.html'
        fs.readFile(path, function(erro, data) {
            if (erro){
                res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
                res.write('<p>Pedido não suportado.</p>')
                res.write('<pre>' + q.pathname + '</pre>')
                res.end()
            } else {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(data)
                res.end()
            }
        })
    } else if(q.pathname == '/'){
        fs.readFile('cidades/index.html', function(erro, data) {
            if (erro){
                res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
                res.write('<p>Pedido não suportado.</p>')
                res.write('<pre>' + q.pathname + '</pre>')
                res.end()
            } else {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(data)
                res.end()
            }
        })
    } else if(q.pathname == '/w3.css'){
        fs.readFile('cidades/w3.css', function(erro, data) {
            if (erro){
                res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
                res.write('<p>Pedido não suportado.</p>')
                res.write('<pre>' + q.pathname + '</pre>')
                res.end()
            } else {
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.write(data)
                res.end()
            }
        })
    }
    console.log(q.pathname)
}).listen(7777)