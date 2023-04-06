from flask import *
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/publicreports', methods=['GET'])
def publicreports():
    data = {'title': 'Public reports', 'data': [10, 11, 12, 13, 14]}
    return json.dumps(data)

@app.route('/neighbourhoods', methods=['GET'])
def neighbourhoods():
    data = {'title': 'Neighbourhoods', 'data': [10, 44, 88, 45, 15]}
    return json.dumps(data)

if __name__ == '__main__':
    app.run(port=7777)