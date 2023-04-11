from flask import *
from flask_cors import CORS
import json
import requests

app = Flask(__name__)
CORS(app)


@app.route('/publicreports/<category>', methods=['GET'])
def publicreports(category):

    # Will get the name and code from all the neighbourhoods
    neighbourhoods = requests.get(
        'https://data.eindhoven.nl/api/records/1.0/search/?dataset=buurten&q=&fields=buurtcode,buurtnaam&rows=10000')
    # Will turn the response into json
    neighbourhoods_data = neighbourhoods.json()

    # Create an array with all the neighbourhoods with a name and a code
    neighbourhood_records = neighbourhoods_data['records']
    main_data_array = []
    for record in neighbourhood_records:
        main_data_array.append(
            {"name": record['fields'].get('buurtnaam'), "code": "BU07721" + str(record['fields'].get('buurtcode'))})

    # Will get all the public reports with the subject of x
    publicreports = requests.get(
        'https://data.eindhoven.nl/api/records/1.0/analyze/?dataset=meldingen-openbare-ruimte&q=&rows=10000&sort=aangemaakt&refine.onderwerp=' + category + '&x=buurt&y.publicreports.func=COUNT')
    # Will turn the response into json
    publicreports_data = publicreports.json()

    # Turn the array into a dictionary
    publicreports_dict = {item['x']: item for item in publicreports_data}

    # Then, iterate over the first list and add the corresponding object from the second list
    for item in main_data_array:
        if item['code'] in publicreports_dict:
            second_item = publicreports_dict[item['code']]
            item['publicreports'] = second_item['publicreports']

    # Add residents to the array
    residents = requests.get(
        'https://data.eindhoven.nl/api/records/1.0/search/?dataset=selectiontableasjsonashx&q=&rows=10000&refine.jaar=2023&fields=buurtcode,totaal_aantal_inwoners')
    residents_data = residents.json()

    residents_array = []
    for neighbourhood in residents_data['records']:
        residents_array.append({"code": "BU07721" + str(neighbourhood['fields'].get('buurtcode')),
                                "residents": neighbourhood['fields'].get('totaal_aantal_inwoners')})

    # First, create a dictionary from the second list for quick lookup
    residents_dict = {item['code']: item for item in residents_array}

    # Then, iterate over the first list and add the corresponding object from the second list
    for item in main_data_array:
        if item['code'] in residents_dict:
            second_item = residents_dict[item['code']]
            if second_item['residents'] is None:
                item['residents'] = 0
            else:
                item['residents'] = second_item['residents']

    chart_data = []
    for item in main_data_array:
        if item.get('publicreports') is not 0:
            chart_data.append({'label': item.get('name') + " (Residents, Public reports)",
                               'data': [{'x': item.get('residents'), 'y': item.get('publicreports')}],
                               'borderColor': '#ff3d3d', 'backgroundColor': '#ff3d3d'})

    data = {'title': 'Public reports', 'data': [
        10, 11, 12, 13, 14], 'category': str(category)}
    return json.dumps({"title": "Public reports", "data": {"datasets": chart_data}})


@ app.route('/neighbourhoods', methods=['GET'])
def neighbourhoods():
    data = {'title': 'Neighbourhoods', 'data': [10, 44, 88, 45, 15]}
    return json.dumps(data)


if __name__ == '__main__':
    app.run(port=7777)
