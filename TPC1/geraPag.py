import os
import xml.etree.ElementTree as ET

diretorio_imgs_atual = "/Users/lapata/Desktop/web/EngWeb2024/TPC1/atual"

def formatar_texto_html(texto):
    if not texto:
        return ""
    if "<para>" in texto:
        texto = texto.replace("<para>", "<p>")
        texto = texto.replace("</para>", "</p>")
    if "<lugar>" in texto:
        texto = texto.replace("<lugar>", "<b>")
        texto = texto.replace("</lugar>", "</b>")
    if "<data>" in texto:
        texto = texto.replace("<data>", "<i>")
        texto = texto.replace("</data>", "</i>")
    return texto

def buscar_imagem_atual(numero):
    imagens2 = []
    numero = str(int(numero))
    for file in os.listdir(diretorio_imgs_atual):
        if file.startswith(f"{numero}-"): 
            cc = os.path.join(diretorio_imgs_atual, file)
            imagens2.append({
                'imagem': cc,
                'legenda': file
            })
    return imagens2

os.chdir('texto')

for file in os.listdir():
    if file.endswith('.xml'):
        file2 = file.split('.')[0]
        tree = ET.parse(file)
        root = tree.getroot()

        número = None
        nome = ""
        imagens = []
        imagens2 = []
        casas = []
        texto = ""

        for child in root:
            if child.tag == 'meta':
                for meta_child in child:
                    if meta_child.tag == 'número':
                        número = int(meta_child.text)
                    elif meta_child.tag == 'nome':
                        nome = meta_child.text
            elif child.tag == 'corpo':
                for corpo_child in child:
                    if corpo_child.tag == 'figura':
                        imagem = None
                        legenda = None
                        for figura_child in corpo_child:
                            if figura_child.tag == 'imagem':
                                imagem = figura_child.attrib['path']
                            elif figura_child.tag == 'legenda':
                                legenda = figura_child.text
                        imagens.append({
                            'imagem': imagem,
                            'legenda': legenda
                        })

                    elif corpo_child.tag == 'para':
                        para_text = ET.tostring(corpo_child, encoding='unicode')
                        texto += formatar_texto_html(para_text) + "\n"
                    elif corpo_child.tag == 'lista-casas':
                        for casa in corpo_child:
                            númeroCasa = None
                            enfiteutaCasa = ""
                            foroCasa = ""
                            desCasa = ""
                            for casa_child in casa:
                                if casa_child.tag == 'número':
                                    númeroCasa = casa_child.text
                                elif casa_child.tag == 'enfiteuta':
                                    enfiteutaCasa = casa_child.text
                                elif casa_child.tag == 'foro':
                                    foroCasa = casa_child.text
                                elif casa_child.tag == 'desc':
                                    aux_text = ET.tostring(casa_child, encoding='unicode')
                                    desCasa = formatar_texto_html(aux_text)
                            casas.append({
                                'númeroCasa': númeroCasa,
                                'enfiteutaCasa': enfiteutaCasa,
                                'foroCasa': foroCasa,
                                'desCasa': desCasa
                            })
        preHTML = f"""
<!DOCTYPE html>
<html>
    <head>
        <title>{nome}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="w3.css">
        <link rel="stylesheet" href="style.css">
        <meta charset="utf-8"/>
    </head>
    <body>
        <div class="w3-card-4 w3-container">
            <header class="w3-container">
                <h1>{número} | {nome}</h1>
            </header>
            <div class="vista-atual">
                <h2>Vista Atual</h2>
                    <div class="w3-row-padding w3-margin-top">
        """
        imagens2 = buscar_imagem_atual(número)
        vista_atual = ""
        if imagens2:
            for imagem in imagens2:
                vista_atual += f"""
                        <div class="w3-third">
                            <div class="w3-card">
                                <img src='{imagem['imagem']}' class="w3-hover-opacity" style="width:100%">
                            </div>
                        </div>
                """
        vista_atual += '</div>'
        vista_antigaI = """
                <h2>Vista Antiga</h2>
        """
        vista_antiga = ""
        if len(imagens) > 2:
            num_linhas = -(-len(imagens) // 2)
            vista_antiga = "<div class='w3-row-padding w3-margin-top'>"
            for i in range(num_linhas):
                vista_antiga += "<div class='w3-row'>"
                for j in range(2):
                    idx = i * 2 + j
                    if idx < len(imagens):
                        imagem = imagens[idx]
                        vista_antiga += f"""
                            <div class="w3-third">
                                <div class="w3-card">
                                    <img src='{imagem['imagem']}' class="w3-hover-opacity" style="width:100%">
                                    <div class="w3-container">
                                        <h5>{imagem['legenda']}</h5>
                                    </div>
                                </div>
                            </div>
                        """
                vista_antiga += "</div>"
            vista_antiga += "</div>"
        else:
            vista_antiga = "<div class='w3-row-padding w3-margin-top'>"
            for imagem in imagens:
                vista_antiga += f"""
                    <div class="w3-third">
                        <div class="w3-card">
                            <img src='{imagem['imagem']}' class="w3-hover-opacity" style="width:100%">
                            <div class="w3-container">
                                <h5>{imagem['legenda']}</h5>
                            </div>
                        </div>
                    </div>
                """
            vista_antiga += "</div>"
        posHTML = f"""
                <div class="descricao">
                    <h2>Descrição</h2>
                        {texto}
                </div>
                <div>
                    <h2>Casas</h2>
                    <div class="w3-responsive">
                        <table class="w3-table w3-striped">
                            <tr>
                                <th>Número</th>
                                <th>Inquilinos</th>
                                <th>Imposto</th>
                                <th>Descrição</th>
                            </tr>
                            {"".join(f"<tr><td>{casa['númeroCasa']}</td><td>{casa['enfiteutaCasa']}</td><td>{casa['foroCasa']}</td><td>{casa['desCasa']}</td></tr>" for casa in casas)}
                        </table>
                    </div>
                </div>
            </div>
            <footer class="w3-container">
                <h5>Generated by TPC1App::EngWeb2024::a95454</h5>
            </footer>            
        </div>
    </body>
</html> 
"""
        pagHTML = preHTML + vista_atual + vista_antigaI + vista_antiga + posHTML
        with open(f'../maparuasSite/{file2}.html', 'w') as f:
            f.write(pagHTML)