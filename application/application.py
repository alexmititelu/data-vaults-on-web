import os
from flask import Flask, send_from_directory

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')


@app.route('/<path:path>')
def serve_static(path):
    return app.send_static_file(path)
