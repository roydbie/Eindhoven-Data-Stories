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

    cur.execute("SELECT text,score FROM texts WHERE category1=? AND category2=?",
                (url_params["category1"], url_params["category2"],))

    rows = cur.fetchall()

    con.commit()

    return json.dumps(rows[0][0])


@app.route('/incomevs/score', methods=['GET'])
def incomeandhealthScore():

    url_params = request.args

    con = sqlite3.connect('texts.db')
    cur = con.cursor()

    cur.execute('''CREATE TABLE IF NOT EXISTS texts
                    (id int PRIMARY KEY , category1 text, category2 text, text text, score int)''')

    cur.execute("SELECT text,score FROM texts WHERE category1=? AND category2=?",
                (url_params["category1"], url_params["category2"],))

    rows = cur.fetchall()

    con.commit()

    return json.dumps(rows[0][1])


@app.route('/incomevs/updatescore', methods=['GET'])
def incomeandhealthScoreUpdate():

    url_params = request.args

    con = sqlite3.connect('texts.db')
    cur = con.cursor()

    cur.execute("SELECT text,score FROM texts WHERE category1=? AND category2=?",
                (url_params["category1"], url_params["category2"],))

    rows = cur.fetchall()

    if url_params["update"] == "plus":
        cur.execute("UPDATE texts SET score=? WHERE text=?",
                    (rows[0][1] + 1, rows[0][0],))
    else:
        cur.execute("UPDATE texts SET score=? WHERE text=?",
                    (rows[0][1] - 1, rows[0][0],))

    cur.execute("SELECT text,score FROM texts WHERE category1=? AND category2=?",
                (url_params["category1"], url_params["category2"],))

    rows = cur.fetchall()

    for row in rows:
        if row[1] <= -3:
            openai.api_key = os.getenv("OPENAI_API_KEY")
            completion = openai.Completion.create(
                model="text-davinci-003",
                prompt=f"\nQ: Generate a random word with 6 letters and only give back the word. First letter capital please.\n\nA: ",
                temperature=1
            )
            cur.execute("UPDATE texts SET text=?,score=0 WHERE text=?",
                        (completion.choices[0].text.strip(), row[0],))
            cur.execute("SELECT text,score FROM texts WHERE category1=? AND category2=?",
                        (url_params["category1"], url_params["category2"],))
            rows = cur.fetchall()

    con.commit()

    return json.dumps(rows[0][1])


@app.route('/insertintodb', methods=['GET'])
def insertintodb():

    con = sqlite3.connect('texts.db')
    cur = con.cursor()

    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (1, "prolonged_illness_percentage", "unhappy_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (2, "prolonged_illness_percentage", "high_level_of_education_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (3, "prolonged_illness_percentage", "personal_income", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (4, "prolonged_illness_percentage", "65plus_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (5, "prolonged_illness_percentage", "worries_about_money_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (6, "prolonged_illness_percentage", "has_debts_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (8, "prolonged_illness_percentage", "prolonged_illness_percentage", "boeie", 0)''')

    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (9, "unhappy_percentage", "prolonged_illness_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (10, "unhappy_percentage", "personal_income", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (11, "unhappy_percentage", "65plus_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (12, "unhappy_percentage", "worries_about_money_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (13, "unhappy_percentage", "has_debts_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (14, "unhappy_percentage", "high_level_of_education_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (15, "unhappy_percentage", "unhappy_percentage", "boeie", 0)''')

    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (16, "high_level_of_education_percentage", "prolonged_illness_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (17, "high_level_of_education_percentage", "high_level_of_education_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (18, "high_level_of_education_percentage", "personal_income", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (19, "high_level_of_education_percentage", "65plus_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (20, "high_level_of_education_percentage", "worries_about_money_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (21, "high_level_of_education_percentage", "has_debts_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (22, "high_level_of_education_percentage", "unhappy_percentage", "boeie", 0)''')

    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (23, "personal_income", "prolonged_illness_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (24, "personal_income", "high_level_of_education_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (25, "personal_income", "personal_income", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (26, "personal_income", "65plus_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (27, "personal_income", "worries_about_money_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (28, "personal_income", "has_debts_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (29, "personal_income", "unhappy_percentage", "boeie", 0)''')

    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (30, "65plus_percentage", "prolonged_illness_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (31, "65plus_percentage", "high_level_of_education_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (32, "65plus_percentage", "personal_income", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (33, "65plus_percentage", "65plus_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (34, "65plus_percentage", "worries_about_money_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (35, "65plus_percentage", "has_debts_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (36, "65plus_percentage", "unhappy_percentage", "boeie", 0)''')

    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (37, "worries_about_money_percentage", "prolonged_illness_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (38, "worries_about_money_percentage", "high_level_of_education_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (39, "worries_about_money_percentage", "personal_income", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (40, "worries_about_money_percentage", "65plus_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (41, "worries_about_money_percentage", "worries_about_money_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (42, "worries_about_money_percentage", "has_debts_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (43, "worries_about_money_percentage", "unhappy_percentage", "boeie", 0)''')

    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (44, "has_debts_percentage", "prolonged_illness_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (45, "has_debts_percentage", "high_level_of_education_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (46, "has_debts_percentage", "personal_income", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (47, "has_debts_percentage", "65plus_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (48, "has_debts_percentage", "worries_about_money_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (49, "has_debts_percentage", "has_debts_percentage", "boeie", 0)''')
    cur.execute('''INSERT OR IGNORE INTO texts (id, category1, category2, text, score) VALUES (50, "has_debts_percentage", "unhappy_percentage", "boeie", 0)''')

    con.commit()

    return "done"


if __name__ == '__main__':
    app.run(port=7777)
