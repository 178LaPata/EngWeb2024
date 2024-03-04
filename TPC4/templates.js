exports.compositoresListPage = function(clist, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Compositores Musicais</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-light-blue">
                    <h1> Compositores Musicais
                        <a class="w3-button w3-circle w3-blue-grey" href="/compositores/registo" style="width:50px; height:50px; display: inline-flex; justify-content: center; align-items: center; float: right;">+</a>
                    </h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>ID</th><th>Nome</th><th>Data de Nascimento</th>
                            <th>Data de Obito</th><th>Periodo</th><th>Actions</th>
                        </tr>
                `
    for(let i=0; i < clist.length ; i++){
        pagHTML += `
                <tr>
                    <td>${clist[i].id}</td>
                    <td>
                        <a href="/compositores/${clist[i].id}">
                            ${clist[i].nome}
                        </a>
                    </td>
                    <td>${clist[i].dataNasc}</td>
                    <td>${clist[i].dataObito}</td>
                    <td>${clist[i].periodo}</td>
                    <td>
                        [<a href="/compositores/edit/${clist[i].id}">Edit</a>][<a href="/compositores/delete/${clist[i].id}">Delete</a>]
                    </td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-light-blue">
                    <h5>Generated by TPC3App::EngWeb2024::a95454::${d}::<a href="/compositores">Return</a></h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.compositorFormPage = function(d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Adicionar Compositor</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-light-blue">
                    <h1>Adicionar Compositor
                        <button class="w3-btn w3-mb-2 w3-blue-grey" type="submit" style="height:50px; display: inline-flex; justify-content: center; align-items: center; float: right;">Registar</button>
                    </h1>

                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Informações</legend>
                        <label>ID</label>
                        <input class="w3-input w3-round" type="text" name="id"/>
                        <label>Nome</label>
                        <input class="w3-input w3-round" type="text" name="nome"/>
                        <label>Bio</label>
                        <input class="w3-input w3-round" type="text" name="bio"/>
                        <label>Data de Nascimento</label>
                        <input class="w3-input w3-round" type="text" name="dataNasc"/>
                        <label>Data de Obito</label>
                        <input class="w3-input w3-round" type="text" name="dataObito"/>
                        <label>Periodo</label>
                        <input class="w3-input w3-round" type="text" name="periodo"/>
                    </fieldset>  
                    <br/>
                </form>

                <footer class="w3-container w3-light-blue">
                    <h5>Generated by TPC3App::EngWeb2024::a95454::${d}::<a href="/compositores">Return</a></h5>
                </footer>
            
            </div>
    `
}

exports.compositorFormEditPage = function(a, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Editar Compositor</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-light-blue">
                    <h1>Editar Compositor
                        <button class="w3-btn w3-mb-2 w3-blue-grey" type="submit" style=" height:50px; display: inline-flex; justify-content: center; align-items: center; float: right;">Registar</button>
                    </h1>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Informações</legend>
                        <label>ID</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${a.id}"/>
                        <label>Name</label>
                        <input class="w3-input w3-round" type="text" name="nome" value="${a.nome}"/>
                        <label>Bio</label>
                        <input class="w3-input w3-round" type="text" name="bio" value="${a.bio}"/>
                        <label>Data de Nascimento</label>
                        <input class="w3-input w3-round" type="text" name="dataNasc" value="${a.dataNasc}"/>
                        <label>Data de Obito</label>
                        <input class="w3-input w3-round" type="text" name="dataObito" value="${a.dataObito}"/>
                        <label>Periodo</label>
                        <input class="w3-input w3-round" type="text" name="periodo" value="${a.periodo}"/>
                    </fieldset>
                    <br/>
                </form>

                <footer class="w3-container w3-light-blue">
                    <h5>Generated by TPC3App::EngWeb2024::a95454::${d}::<a href="/compositores">Return</a></h5>
                </footer>
            
            </div>
    `
    return pagHTML
}

exports.compositorPage = function(compositor, d ){
    var pagHTML = `
    <html>
    <head>
        <title>${compositor.nome}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-light-blue">
                <h1>${compositor.nome}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>ID: </b> ${compositor.id}</li>
                    <li><b>Nome: </b> ${compositor.nome}</li>
                    <li><b>Bio: </b> ${compositor.bio}</li>
                    <li><b>Data de Nascimento: </b> ${compositor.dataNasc}</li>
                    <li><b>Data de Obito: </b> ${compositor.dataObito}</li> 
                    <li><b>Periodo: </b> ${compositor.periodo}</li>
                </ul>
            </div>
            <footer class="w3-container w3-light-blue">
                <h5>Generated by TPC3App::EngWeb2024::a95454::${d}::<a href="/compositores">Return</a></h5>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}








exports.periodosListPage = function(plist, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Periodos Musicais</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-light-blue">
                    <h1> Periodos Musicais
                        <a class="w3-button w3-circle w3-blue-grey" href="/periodos/registo" style="width:50px; height:50px; display: inline-flex; justify-content: center; align-items: center; float: right;">+</a>
                    </h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Periodo</th>
                        </tr>
                `
    for(let i=0; i < plist.length ; i++){
        pagHTML += `
                <tr>
                    <td>${plist[i].periodo}</td>
                    <td>
                        [<a href="/periodos/edit/${plist[i].id}">Edit</a>][<a href="/periodos/delete/${plist[i].id}">Delete</a>]
                    </td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-light-blue">
                    <h5>Generated by TPC3App::EngWeb2024::a95454::${d}::<a href="/periodos">Return</a></h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.periodoFormPage = function(d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Adicionar Periodo</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-light-blue">
                    <h1>Adicionar Periodo
                        <button class="w3-btn w3-mb-2 w3-blue-grey" type="submit" style="height:50px; display: inline-flex; justify-content: center; align-items: center; float: right;">Registar</button>
                    </h1>

                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Informações</legend>
                        <label>Nome</label>
                        <input class="w3-input w3-round" type="text" name="periodo"/>
                        <label>Compositores</label>
                        <textarea class="w3-input w3-round" name="compositores" rows="4"></textarea>
                    </fieldset> 
                    <br/>
                </form>

                <footer class="w3-container w3-light-blue">
                    <h5>Generated by TPC3App::EngWeb2024::a95454::${d}::<a href="/compositores">Return</a></h5>
                </footer>
            
            </div>
    `
}

exports.compositorFormEditPage = function(a, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Editar Compositor</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-light-blue">
                    <h1>Editar Compositor
                        <button class="w3-btn w3-mb-2 w3-blue-grey" type="submit" style=" height:50px; display: inline-flex; justify-content: center; align-items: center; float: right;">Registar</button>
                    </h1>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Informações</legend>
                        <label>ID</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${a.id}"/>
                        <label>Name</label>
                        <input class="w3-input w3-round" type="text" name="nome" value="${a.nome}"/>
                        <label>Bio</label>
                        <input class="w3-input w3-round" type="text" name="bio" value="${a.bio}"/>
                        <label>Data de Nascimento</label>
                        <input class="w3-input w3-round" type="text" name="dataNasc" value="${a.dataNasc}"/>
                        <label>Data de Obito</label>
                        <input class="w3-input w3-round" type="text" name="dataObito" value="${a.dataObito}"/>
                        <label>Periodo</label>
                        <input class="w3-input w3-round" type="text" name="periodo" value="${a.periodo}"/>
                    </fieldset>
                    <br/>
                </form>

                <footer class="w3-container w3-light-blue">
                    <h5>Generated by TPC3App::EngWeb2024::a95454::${d}::<a href="/compositores">Return</a></h5>
                </footer>
            
            </div>
    `
    return pagHTML
}

exports.compositorPage = function(compositor, d ){
    var pagHTML = `
    <html>
    <head>
        <title>${compositor.nome}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-light-blue">
                <h1>${compositor.nome}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>ID: </b> ${compositor.id}</li>
                    <li><b>Nome: </b> ${compositor.nome}</li>
                    <li><b>Bio: </b> ${compositor.bio}</li>
                    <li><b>Data de Nascimento: </b> ${compositor.dataNasc}</li>
                    <li><b>Data de Obito: </b> ${compositor.dataObito}</li> 
                    <li><b>Periodo: </b> ${compositor.periodo}</li>
                </ul>
            </div>
            <footer class="w3-container w3-light-blue">
                <h5>Generated by TPC3App::EngWeb2024::a95454::${d}::<a href="/compositores">Return</a></h5>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}








exports.errorPage = function(errorMessage, d){
    return `
    <html>
    <head>
        <title>Error Page</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-light-blue">
                <h1>Error Page</h1>
            </header>

            <div class="w3-container">
                <p>${d}: Error: ${errorMessage}</p>
            </div>
            <footer class="w3-container w3-light-blue">
                <h5>Generated by TPC3App::EngWeb2024::a95454::${d}::<a href="/compositores">Return</a></h5>
            </footer>
        </div>
    </body>
    </html>
    `
}