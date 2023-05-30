from flask import *
from flask_cors import CORS
import json
import requests
from operator import itemgetter
import numpy as np
import sqlite3
import os
from dotenv import load_dotenv
import openai

import pandas as pd


app = Flask(__name__)
CORS(app)

load_dotenv()


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


@app.route('/incomevs', methods=['GET'])
def incomeandhealth():

    url_params = request.args

    df = pd.read_json('data.json').to_json(orient='records')

    dfData = json.loads(df)

    try:
        districtsArray = url_params['districts']
    except KeyError:
        districtsArray = ["Centrum",
                          "Gestel",
                          "Stratum",
                          "Strijp",
                          "Tongelre",
                          "Woensel-Noord",
                          "Woensel-Zuid"]

    bubbleChartData = {
        "datasets": [],
    }

    for item in dfData:
        if item.get("district") in districtsArray or districtsArray == "":
            if item.get("district") == "Tongelre":
                backgroundColor = "rgba(125, 235, 0, 0.75)"
            elif item.get("district") == "Strijp":
                backgroundColor = "rgba(255, 230, 0, 0.75)"
            elif item.get("district") == "Stratum":
                backgroundColor = "rgba(0, 214, 233, 0.75)"
            elif item.get("district") == "Woensel-Noord":
                backgroundColor = "rgba(255, 33, 66, 0.75)"
            elif item.get("district") == "Gestel":
                backgroundColor = "rgba(88, 135, 255, 0.75)"
            elif item.get("district") == "Centrum":
                backgroundColor = "rgba(255, 133, 88, 0.75)"
            elif item.get("district") == "Woensel-Zuid":
                backgroundColor = "rgba(227, 88, 255, 0.75)"

            bubbleChartData.get("datasets").append({"label": item.get("neighbourhood"), "data": [{"y": item.get("2020").get(url_params['category1']), "x": item.get("2020").get(
                url_params['category2']), "r": (item.get("2020").get("residents")/100)}], "backgroundColor": backgroundColor, "borderColor": "white", "borderWidth": 1})

    return json.dumps({"data": bubbleChartData})


@app.route('/incomevs/text', methods=['GET'])
def incomeandhealthText():

    url_params = request.args

    con = sqlite3.connect('texts.db')
    cur = con.cursor()

    cur.execute('''CREATE TABLE IF NOT EXISTS texts
                    (id int PRIMARY KEY , category1 text, category2 text, text text, score int)''')

    cur.execute('''SELECT text FROM texts WHERE category1=? AND category2=?''',
                (url_params["category1"], url_params["category2"],))

    rows = cur.fetchall()

    con.commit()

    return json.dumps(rows[0][0])


@app.route('/incomevs/updatetext', methods=['GET'])
def incomeandhealthScoreUpdate():

    url_params = request.args

    con = sqlite3.connect('texts.db')
    cur = con.cursor()

    cur.execute('''SELECT id, text FROM texts WHERE category1=? AND category2=?''',
                (url_params["category1"], url_params["category2"],))

    rows = cur.fetchall()

    df = pd.read_csv('data_clean.csv')
    df[url_params["category1"]].dropna()

    Q1 = df[url_params["category1"]].quantile(.25)
    Q3 = df[url_params["category1"]].quantile(.75)
    IQR = Q3 - Q1

    outliers = df[url_params["category1"]][((df[url_params["category1"]] < (
        Q1-1.5*IQR)) | (df[url_params["category1"]] > (Q3+1.5*IQR)))]

    x = outliers.values.tolist()

    array = []

    for item in x:
        x = df.loc[df[url_params["category1"]]
                   == item].reset_index(drop=True).to_dict()

        array.append({"neighbourhood": x.get("neighbourhood").get(0),
                     url_params["category1"]: x.get(url_params["category1"]).get(0)})

    if array != []:
        openai.api_key = os.getenv("OPENAI_API_KEY")
        completion = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"\nQ: We are calculating outliers from a dataset. The complete dataset consists of 116 neighbourhoods. At the end of this prompt i will give you an json array of outliers with the neighbourhood name and the value of the outlier. The subject of this analysis is {url_params['category1']}. Can you create a simple text to summarize what we analyzed? Maximum 150 words. This is the array of outliers: {array}.\n\nA: ",
            temperature=0.8,
            max_tokens=500
        )
        cur.execute('''UPDATE texts SET text=? WHERE id=?''',
                    (completion.choices[0].text, rows[0][0],))
    else:
        cur.execute('''UPDATE texts SET text=? WHERE id=?''',
                    ("No outliers were detected.", rows[0][0],))

    cur.execute('''SELECT text FROM texts WHERE category1=? AND category2=?''',
                (url_params["category1"], url_params["category2"],))
    rows2 = cur.fetchall()

    con.commit()

    return json.dumps(rows2[0][0])


@app.route('/incomevs/outliers', methods=['GET'])
def outliers():

    url_params = request.args
    df = pd.read_csv('data_clean.csv')
    df[url_params["category"]].dropna()

    Q1 = df[url_params["category"]].quantile(.25)
    Q3 = df[url_params["category"]].quantile(.75)
    IQR = Q3 - Q1

    outliers = df[url_params["category"]][((df[url_params["category"]] < (
        Q1-1.5*IQR)) | (df[url_params["category"]] > (Q3+1.5*IQR)))]

    x = outliers.values.tolist()

    array = []

    for item in x:
        x = df.loc[df[url_params["category"]]
                   == item].reset_index(drop=True).to_dict()

        array.append({"neighbourhood": x.get("neighbourhood").get(0),
                     url_params["category"]: x.get(url_params["category"]).get(0)})

    return array


if __name__ == '__main__':
    app.run(port=7777)
