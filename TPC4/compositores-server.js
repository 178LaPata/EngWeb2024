var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')
var static = require('./static.js') 

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var compositoresServer = http.createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                if(req.url == '/compositores'){
                    axios.get('http://localhost:3000/compositores')
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.compositoresListPage(resposta.data, d))
                        })
                        .catch(erro => {
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                else if(/\/compositores\/C[0-9]+/.test(req.url)){
                    axios.get('http://localhost:3000' + req.url)
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.compositorPage(resposta.data, d))
                        })
                        .catch(erro => {
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                else if (req.url == '/compositores/registo'){
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(templates.compositorFormPage(d))
                }
                else if(/\/compositores\/edit\/C[0-9]+/.test(req.url)){
                    var partes = req.url.split('/')
                    var id = partes[partes.length - 1]
                    axios.get('http://localhost:3000/compositores/' + id)
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.compositorFormEditPage(resposta.data, d))
                        })
                        .catch(erro =>{
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                else if (/\/compositores\/delete\/C[0-9]+/.test(req.url)){
                    var partes = req.url.split("/")
                    var id = partes[partes.length - 1]
                    axios.delete('http://localhost:3000/compositores/' + id)
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.compositorPage(resposta.data, d))
                            //res.end(`<pre>${JSON.stringify(resposta.data)}</pre>`)
                        })
                        .catch(erro => {
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                else if(req.url == '/periodos'){
                    axios.get('http://localhost:3000/periodos')
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodosListPage(resposta.data, d))
                        })
                        .catch(erro => {
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                else if(/\/periodos\/[a-zA-Z]+/.test(req.url)){
                    axios.get('http://localhost:3000' + req.url)
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodoPage(resposta.data, d))
                        })
                        .catch(erro => {
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                else if (req.url == '/periodos/registo'){
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(templates.periodoFormPage(d))
                }
                else if(/\/periodos\/edit\/[a-zA-Z]+/.test(req.url)){
                    var partes = req.url.split('/')
                    var id = partes[partes.length - 1]
                    axios.get('http://localhost:3000/periodos/' + id)
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodoFormEditPage(resposta.data, d))
                        })
                        .catch(erro =>{
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                else if (/\/periodos\/delete\/[a-zA-Z]+/.test(req.url)){
                    var partes = req.url.split("/")
                    var id = partes[partes.length - 1]
                    axios.delete('http://localhost:3000/periodos/' + id)
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodoPage(resposta.data, d))
                            //res.end(`<pre>${JSON.stringify(resposta.data)}</pre>`)
                        })
                        .catch(erro => {
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                else {
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    res.end(templates.errorPage(`Pedido GET não suportado: ${req.url}`, d))
                }
                break
            case "POST":
                if (req.url == '/compositores/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/compositores', result)
                                .then(resposta => {
                                    res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.end(templates.compositorPage(resposta.data, d))
                                })
                                .catch(erro => {
                                    res.writeHead(521, {'Content-Type': 'text/html'})
                                    res.end(templates.errorPage(erro, d))
                                }) 
                    } else {
                        res.writeHead(404, {'Content-Type': 'text/html'})
                        res.write("<p>Unable to collect data from body...</p>")
                        res.end()
                    }
                    })
                }
                else if (/\/compositores\/edit\/C[0-9]+/.test(req.url)){
                    var partes = req.url.split("/")
                    var idAluno = partes[partes.length - 1]
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/compositores/' + idAluno, result)
                                .then(resposta => {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.end(templates.compositorPage(resposta.data, d))
                                })
                                .catch(erro => {
                                    res.writeHead(521, {'Content-Type': 'text/html'})
                                    res.end(templates.errorPage(erro, d))
                                }) 
                    } else {
                        res.writeHead(404, {'Content-Type': 'text/html'})
                        res.write("<p>Unable to collect data from body...</p>")
                        res.end()
                    }
                    })
                }
                else if (req.url == '/periodos/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/periodos', result)
                                .then(resposta => {
                                    res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.end(templates.periodoPage(resposta.data, d))
                                })
                                .catch(erro => {
                                    res.writeHead(521, {'Content-Type': 'text/html'})
                                    res.end(templates.errorPage(erro, d))
                                }) 
                    } else {
                        res.writeHead(404, {'Content-Type': 'text/html'})
                        res.write("<p>Unable to collect data from body...</p>")
                        res.end()
                    }
                    })
                }
                else if (/\/periodos\/edit\/[a-zA-Z]+/.test(req.url)){
                    var partes = req.url.split("/")
                    var idAluno = partes[partes.length - 1]
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/periodos/' + idAluno, result)
                                .then(resposta => {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.end(templates.periodoPage(resposta.data, d))
                                })
                                .catch(erro => {
                                    res.writeHead(521, {'Content-Type': 'text/html'})
                                    res.end(templates.errorPage(erro, d))
                                }) 
                    } else {
                        res.writeHead(404, {'Content-Type': 'text/html'})
                        res.write("<p>Unable to collect data from body...</p>")
                        res.end()
                    }
                    })
                }
                else {
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    res.end(templates.errorPage(`Pedido POST não suportado: ${req.url}`, d))
                }
            default:
                // Outros metodos nao sao suportados
        }
    }
})

compositoresServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})

