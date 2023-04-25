from flask import *
from flask_cors import CORS
import json
import requests
from operator import itemgetter
import numpy as np

import pandas as pd


app = Flask(__name__)
CORS(app)



@app.route('/publicreports/scatter/<category>', methods=['GET'])
def publicreportsScatter(category):
    main_data_array = []

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

    scatterChartArray = main_data_array

    # Will get all the public reports with the subject of x
    publicreports = requests.get(
        'https://data.eindhoven.nl/api/records/1.0/analyze/?dataset=meldingen-openbare-ruimte&q=&rows=10000&sort=aangemaakt&refine.onderwerp=' + category + '&x=buurt&y.publicreports.func=COUNT')
    # Will turn the response into json
    publicreports_data = publicreports.json()

    # Turn the array into a dictionary
    publicreports_dict = {item['x']: item for item in publicreports_data}

    # Then, iterate over the first list and add the corresponding object from the second list
    for item in scatterChartArray:
        if item['code'] in publicreports_dict:
            second_item = publicreports_dict[item['code']]
            item['publicreports'] = second_item['publicreports']

    scatterChartData = []
    for item in scatterChartArray:
        if item.get('publicreports') != 0:
            scatterChartData.append({'label': item.get('name') + " (Residents, Public reports)",
                                     'data': [{'x': item.get('residents'), 'y': item.get('publicreports')}],
                                     'borderColor': '#ffcc00', 'backgroundColor': '#ffcc00'})

    return json.dumps({"data": {"datasets": scatterChartData}})


@app.route('/publicreports/bar/<category>/<fewResidentsExcluded>', methods=['GET'])
def publicreportsBar(category, fewResidentsExcluded):

    main_data_array = np.array([])

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

    barChartArray = main_data_array

    # Will get all the public reports with the subject of x
    publicreports = requests.get(
        'https://data.eindhoven.nl/api/records/1.0/analyze/?dataset=meldingen-openbare-ruimte&q=&rows=10000&sort=aangemaakt&refine.onderwerp=' + category + '&x=buurt&y.publicreports.func=COUNT')
    # Will turn the response into json
    publicreports_data = publicreports.json()

    # Turn the array into a dictionary
    publicreports_dict = {item['x']: item for item in publicreports_data}

    for item in barChartArray:
        if fewResidentsExcluded == "true":
            if item['residents'] < 25:
                barChartArray.remove(item)

    # Then, iterate over the first list and add the corresponding object from the second list
    for item in barChartArray:
        if item['code'] in publicreports_dict:
            second_item = publicreports_dict[item['code']]
            item['publicreports'] = second_item['publicreports']
            if (item['residents'] != 0 and item['publicreports'] != 0):
                item['ratio'] = round(
                    (item['publicreports'] / item['residents']), 2)
            else:
                item['ratio'] = item['publicreports']
        else:
            item['publicreports'] = 0
            item['ratio'] = 0

    def customSort(k):
        return k.get('ratio')

    barChartArray.sort(key=customSort, reverse=True)

    barChartData = {"labels": [], "datasets": [{"label": "Reports per resident",
                                                "data": [], "backgroundColor": [], "borderColor": [], "borderWidth": 1}]}
    for item in barChartArray:
        if item.get('publicreports') != 0:
            barChartData['labels'].append(item.get('name'))
            barChartData['datasets'][0]['data'].append(item.get('ratio'))
            barChartData['datasets'][0]['backgroundColor'].append(
                'rgba(255, 205, 86, 0.2)')
            barChartData['datasets'][0]['borderColor'].append('#ffcc00')

    return json.dumps({"data": barChartData})


@app.route('/incomevs/<category>', methods=['GET'])
def income(category):

    df = pd.read_json('data.json').to_json(orient='records')

    dfData = json.loads(df)

    bubbleChartData = {
        "datasets": [],
    }

    for item in dfData:
        if item.get("district") == "Stadsdeel Tongelre":
            borderColor = "rgba(125, 235, 0, 1)"
            backgroundColor = "rgba(125, 235, 0, 0.75)"
        elif item.get("district") == "Stadsdeel Strijp":
            borderColor = "rgba(255, 230, 0, 1)"
            backgroundColor = "rgba(255, 230, 0, 0.75)"
        elif item.get("district") == "Stadsdeel Stratum":
            borderColor = "rgba(0, 214, 233, 1)"
            backgroundColor = "rgba(0, 214, 233, 0.75)"
        elif item.get("district") == "Stadsdeel Woensel-Noord":
            borderColor = "rgba(255, 33, 66, 1)"
            backgroundColor = "rgba(255, 33, 66, 0.75)"
        elif item.get("district") == "Stadsdeel Gestel":
            borderColor = "rgba(88, 135, 255, 1)"
            backgroundColor = "rgba(88, 135, 255, 0.75)"
        elif item.get("district") == "Stadsdeel Centrum":
            borderColor = "rgba(255, 133, 88, 1)"
            backgroundColor = "rgba(255, 133, 88, 0.75)"
        elif item.get("district") == "Stadsdeel Woensel-Zuid":
            borderColor = "rgba(227, 88, 255, 1)"
            backgroundColor = "rgba(227, 88, 255, 0.75)"

        if category == "longtermillness":
            y = item.get("2020").get("prolonged_illness_percentage")
        else:
            y = item.get("2020").get("unhappy_percentage")

        bubbleChartData.get("datasets").append({"label": item.get("neighbourhood"), "data": [{"y": y, "x": item.get("2020").get(
            "personal_income"), "r": (item.get("2020").get("residents")/100)}], "backgroundColor": backgroundColor, "borderColor": "white", "borderWidth": 1})

    return json.dumps({"data": bubbleChartData})

@app.route('/test', methods=['GET'])
def test():
    x=10*10
    return str(x) 


if __name__ == '__main__':
    app.run(port=7777)
