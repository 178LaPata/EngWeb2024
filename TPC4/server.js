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
                // GET /compositores --------------------------------------------------------------------
                if(req.url == '/compositores'){
                    axios.get('http://localhost:3000/compositores')
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.compositoresListPage(resposta.data, d))
                        })
                        .catch(erro => {
                            //res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPageCompositores(erro, d))
                        })
                }
                // GET /compositores/:id --------------------------------------------------------------------
                else if(/\/compositores\/C[0-9]+/.test(req.url)){
                    axios.get('http://localhost:3000' + req.url)
                        .then(resposta => {
                            var compositor = resposta.data;
                            axios.get('http://localhost:3000/periodos')
                                .then(resposta => {
                                    var periodos = resposta.data;
                                    var periodo = periodos.find(periodo => periodo.periodo === compositor.periodo);
                                    res.writeHead(200, {'Content-Type': 'text/html'})
                                    res.end(templates.compositorPage(compositor, d, periodo))
                                });
                        })
                        .catch(erro => {
                            //res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPageCompositores(erro, d))
                        })
                }
                // GET /compositores/registo --------------------------------------------------------------------
                else if (req.url == '/compositores/registo'){
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(templates.compositorFormPage(d))
                }
                // GET /compositores/edit/:id --------------------------------------------------------------------
                else if(/\/compositores\/edit\/C[0-9]+/.test(req.url)){
                    var partes = req.url.split('/')
                    var id = partes[partes.length - 1]
                    axios.get('http://localhost:3000/compositores/' + id)
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.compositorFormEditPage(resposta.data, d))
                        })
                        .catch(erro =>{
                            //res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPageCompositores(erro, d))
                        })
                }
                // GET /compositores/delete/:id --------------------------------------------------------------------
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
                            //res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPageCompositores(erro, d))
                        })
                }
                // GET /periodos --------------------------------------------------------------------
                else if(req.url == '/periodos'){
                    axios.get('http://localhost:3000/periodos')
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodosListPage(resposta.data, d))
                        })
                        .catch(erro => {
                            //res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPagePeriodo(erro, d))
                        })
                }
                // GET /periodos/:id --------------------------------------------------------------------
                else if(/\/periodos\/p\d+/.test(req.url)){
                    var partes = req.url.split('/')
                    var id = partes[partes.length - 1]
                    axios.get('http://localhost:3000/periodos/' + id)
                        .then(resposta => {
                            var periodo = resposta.data;
                            return axios.get('http://localhost:3000/compositores/')
                                .then(resposta => {
                                    var compositores = resposta.data;
                                    var compositoresDoPeriodo = compositores.filter(compositor => compositor.periodo === periodo.periodo);
                                    res.writeHead(200, {'Content-Type': 'text/html'})
                                    res.end(templates.periodoPage(periodo, d, compositoresDoPeriodo))
                                });
                        })
                        .catch(erro => {
                            //res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPagePeriodo(erro, d))
                        })
                }
                // GET /periodos/registo --------------------------------------------------------------------
                else if (req.url == '/periodos/registo'){
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(templates.periodoFormPage(d))
                }
                // GET /periodos/edit/:id --------------------------------------------------------------------
                else if(/\/periodos\/edit\/p\d+/.test(req.url)){
                    var partes = req.url.split('/')
                    var id = partes[partes.length - 1]
                    axios.get('http://localhost:3000/periodos/' + id)
                        .then(resposta => {
                            var periodo = resposta.data;
                            axios.get('http://localhost:3000/compositores/')
                                .then(resposta => {
                                    var compositores = resposta.data;
                                    var compositoresDoPeriodo = compositores.filter(compositor => compositor.periodo === periodo.periodo);
                                    res.writeHead(200, {'Content-Type': 'text/html'})
                                    res.end(templates.periodoFormEditPage(periodo, d, compositoresDoPeriodo))
                                });
                        })
                        .catch(erro =>{
                            //res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPagePeriodo(erro, d))
                        })
                }
                // GET /periodos/delete/:id --------------------------------------------------------------------
                else if (/\/periodos\/delete\/p\d+/.test(req.url)){
                    var partes = req.url.split("/")
                    var id = partes[partes.length - 1]
                    axios.delete('http://localhost:3000/periodos/' + id)
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodoPage(resposta.data, d))
                            //res.end(`<pre>${JSON.stringify(resposta.data)}</pre>`)
                        })
                        .catch(erro => {
                            //res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPagePeriodo(erro, d))
                        })
                }
                // GET ? -> Lancar um erro
                else {
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    res.end(templates.errorPageCompositores(`Pedido GET não suportado: ${req.url}`, d))
                }
                break
            case "POST":
                // POST /compositores/registo --------------------------------------------------------------------
                if (req.url == '/compositores/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/compositores', result)
                                .then(resposta => {
                                    res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.end(templates.compositorPage(resposta.data, d))
                                })
                                .catch(erro => {
                                    //res.writeHead(521, {'Content-Type': 'text/html'})
                                    res.end(templates.errorPageCompositores(erro, d))
                                }) 
                    } else {
                        res.writeHead(404, {'Content-Type': 'text/html'})
                        res.write("<p>Unable to collect data from body...</p>")
                        res.end()
                    }
                    })
                }
                // POST /compositores/edit/:id --------------------------------------------------------------------
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
                                    //res.writeHead(521, {'Content-Type': 'text/html'})
                                    res.end(templates.errorPageCompositores(erro, d))
                                }) 
                    } else {
                        res.writeHead(404, {'Content-Type': 'text/html'})
                        res.write("<p>Unable to collect data from body...</p>")
                        res.end()
                    }
                    })
                }
                // POST /periodos/registo --------------------------------------------------------------------
                else if (req.url == '/periodos/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/periodos', result)
                                .then(resposta => {
                                    res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.end(templates.periodoPage(resposta.data, d))
                                })
                                .catch(erro => {
                                    //res.writeHead(521, {'Content-Type': 'text/html'})
                                    res.end(templates.errorPagePeriodo(erro, d))
                                }) 
                    } else {
                        res.writeHead(404, {'Content-Type': 'text/html'})
                        res.write("<p>Unable to collect data from body...</p>")
                        res.end()
                    }
                    })
                }
                // POST /periodos/edit/:id --------------------------------------------------------------------
                else if (/\/periodos\/edit\/[a-zA-Z]+/.test(req.url)){
                    var partes = req.url.split("/")
                    var idAluno = partes[partes.length - 1]
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/periodos/' + idAluno, result)
                                .then(resposta => {
                                    var periodo = resposta.data;
                                    axios.get('http://localhost:3000/compositores/')
                                        .then(resposta => {
                                            var compositores = resposta.data;
                                            var compositoresDoPeriodo = compositores.filter(compositor => compositor.periodo === periodo.periodo);
                                            res.writeHead(200, {'Content-Type': 'text/html'})
                                            res.end(templates.periodoPage(periodo, d, compositoresDoPeriodo))
                                        });
                                })
                                .catch(erro => {
                                    //res.writeHead(521, {'Content-Type': 'text/html'})
                                    res.end(templates.errorPagePeriodo(erro, d))
                                }) 
                        } else {
                            res.writeHead(404, {'Content-Type': 'text/html'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                // POST ? -> Lancar um erro
                else {
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    res.end(templates.errorPageCompositores(`Pedido POST não suportado: ${req.url}`, d))
                }
            default:
                // Outros metodos nao sao suportados
        }
    }
})

compositoresServer.listen(7777, ()=>{
    console.log("Server is running on port 7777")
})
