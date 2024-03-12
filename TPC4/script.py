import os
import json

def read_json(file):
    try:
        with open(file, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print('Arquivo não encontrado')
    except Exception as e:
        print('Erro desconhecido:', e)
    
    return data

def write_json(data, file):
    try:
        with open(file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
    except Exception as e:
        print('Erro desconhecido:', e)

def get_periodos(data):
    periodos = []
    id_counter = 1
    for i in data['compositores']:
        if 'periodo' in i:
            periodo = i['periodo']
            existing_periodo = next((p for p in periodos if p['periodo'] == periodo), None)
            if existing_periodo:
                existing_periodo['compositores'].append(i['id'])
            else:
                periodos.append({
                    "id": "p" + str(id_counter),
                    "periodo": periodo,
                    "compositores": [i['id']]
                })
                id_counter += 1
    return periodos

file = 'compositores.json'

bd = read_json(file)
periodo = get_periodos(bd)

novaDB = ({
    "compositores": bd['compositores'],
    "periodos": periodo
    })

write_json(novaDB, 'compositores2.json')