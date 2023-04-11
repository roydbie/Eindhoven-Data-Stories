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
        if item.get('publicreports') != 0:
            chart_data.append({'label': item.get('name') + " (Residents, Public reports)",
                               'data': [{'x': item.get('residents'), 'y': item.get('publicreports')}],
                               'borderColor': '#ffcc00', 'backgroundColor': '#ffcc00'})

    data = {'title': 'Public reports', 'data': [
        10, 11, 12, 13, 14], 'category': str(category)}
    return json.dumps(
        {
            "title": "Public reports",
            "components": [
                {
                    "type": "text",
                    "title": "Introduction",
                    "text": "The city of Eindhoven is one of the largest and most vibrant cities in the Netherlands, and it is known for its innovation, design, and technology. As with any city, there are various public reports that citizens can make regarding issues in the city's public spaces, such as potholes, broken streetlights, or litter. These reports are important because they allow the city to identify and address issues in a timely manner, which can improve the quality of life for residents and visitors.\n\nThe city of Eindhoven has made these public reports available in a public database, which allows citizens, researchers, and other interested parties to access and analyze the data. This database contains information on the location and nature of the reports, as well as other relevant details such as the date of the report, the neighbourhood, and the type of issue.\n\nIn this analysis, we will explore the public reports in the city of Eindhoven, with the aim of gaining insights into the issues that are most commonly reported and the areas of the city that are most affected. By doing so, we hope to contribute to the ongoing efforts to improve the city's public spaces and make Eindhoven an even better place to live, work, and visit."
                },
                {
                    "type": "chart",
                    "title": "Public reports per amount of residents",
                    "data": {"datasets": chart_data},
                    "options": {
                        "responsive": True,
                        "maintainAspectRatio": False,
                        "plugins": {
                            "legend": {
                                "display": False,
                            },
                            "title": {
                                "display": True,
                                "text": "Public reports to residents ratio",
                            },
                        },
                        "scales": {
                            "x": {
                                "border": {"color": "white"},
                                "title": {
                                    "display": True,
                                    "text": "Amount of residents in the neighbourhood",
                                    "color": "#ffffff",
                                },
                                "grid": {
                                    "display": False,
                                },
                                "ticks": {
                                    "color": "white",
                                },
                            },
                            "y": {
                                "border": {"color": "white"},
                                "title": {
                                    "display": True,
                                    "text": "Amount of public reports in the neighbourhood",
                                    "color": "#ffffff",
                                },
                                "grid": {
                                    "display": False,
                                },
                                "ticks": {
                                    "color": "white",
                                },
                            },
                        },
                    }
                }
            ],
        }
    )


@ app.route('/neighbourhoods', methods=['GET'])
def neighbourhoods():
    data = {'title': 'Neighbourhoods', 'data': [10, 44, 88, 45, 15]}
    return json.dumps(data)


if __name__ == '__main__':
    app.run(port=7777)
