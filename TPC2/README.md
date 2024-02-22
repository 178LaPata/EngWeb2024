# TPC2: Servidor de Ficheiros Estáticos
## 2024-02-22

## Autor:
- a95454
- Lara Beatriz Pinto Ferreira

## Resumo

Processar o dataset do mapa virtual:

1. Criar uma página para cada cidade (c1.html, c2.html, etc.)
2. Página Principal com uma lista das cidades, por ordem alfabética onde cada cidade é um link da forma:
```
<li><a href= "http://localhost:????/c3">Braga</a></li>
```

Em relação ao serviço node.js:

    / -> página principal

    /c1 -> página da cidade c1

Cada página da cidade terá: id, nome, população, descrição, distrito e as ligações