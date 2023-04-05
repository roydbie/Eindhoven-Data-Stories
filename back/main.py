from flask import *
import json

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    data = {'data': [10, 11, 12, 13, 14]}
    return json.dumps(data)

if __name__ == '__main__':
    app.run(port=7777)