import os
import xml.etree.ElementTree as ET

preHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa das Ruas de Braga</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="w3.css">
        <link rel="stylesheet" href="style.css">
        <meta charset="utf-8"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container">
                <h1>Mapa das Ruas de Braga</h1>
            </header>
            
            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
"""

posHTLM = """
                </ul>
            </div>
            
            <footer class="w3-container">
                <h5>Generated by TPC1App::EngWeb2024::a95454</h5>
            </footer>            
        </div>
    </body>
</html> 
"""

conteudo = ""

os.chdir('texto')

ruas = []
files = []

for file in os.listdir():
    if file.endswith('.xml'):
        tree = ET.parse(file)
        root = tree.getroot()
        número = 0
        nome = None
        for child in root:
            if child.tag == 'meta':
                for meta_child in child:
                    if meta_child.tag == 'número':
                        número = int(meta_child.text)
                    elif meta_child.tag == 'nome':
                        nome = meta_child.text
        if número and nome:
            ruas.append((número, nome, file))

ruas.sort(key=lambda x: int(x[0]))

for número, nome, file in ruas:
    file2 = f"{file.split('.')[0]}.html"
    conteudo += f"""
                    <li>
                        <a href="{file2}">{número} | {nome}</a>
                    </li>
        """


pagHTML = preHTML + conteudo + posHTLM

os.chdir('..')
os.chdir('maparuasSite')

with open('index.html', 'w') as f:
    f.write(pagHTML)


