import json
import requests

with open('dataset-extra1.json') as f:
    data = json.load(f)

with open('dataset-extra2.json') as d:
    data += json.load(d)

with open('dataset-extra3.json') as s:
    data += json.load(s)

for record in data:
    response = requests.post('http://localhost:7777/pessoas', json=record)

    if response.status_code != 200:
        print(f'Error: {response.status_code}, {response.content}, {response.json()}')

print('Done!')