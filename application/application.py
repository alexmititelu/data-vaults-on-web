import os
from flask import Flask, send_from_directory,request

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')

@app.route('/face-rekognition-test/<path:user_email>',methods=['POST'])
def get_face_rekognition_restul(user_email):
    print(user_email)
    print(request)
    file = request.files.get('webcam')
    file_extension = file.mimetype.split("/")[-1]
    file.save("temp_file."+file_extension)
    print(file_extension)
    return "200"

@app.route('/<path:path>')
def serve_static(path):
    return app.send_static_file(path)

if __name__ == "__main__":
    app.run(port=5555, debug=True)