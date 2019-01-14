import os
from flask import Flask, send_from_directory,request
from applicationpackages.facerekognition import *

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')

@app.route('/face-rekognition-test/<path:user_email>',methods=['POST'])
def send_rekognition_result(user_email):
    print("test")
    save_file_locally(request,user_email,"reko")
    rez = get_face_comparison_result(user_email)
    print(rez)
    return rez
    

@app.route('/face-rekognition-create-profile/<path:user_email>',methods=['POST'])
def create_face_rekognition_profile(user_email):
    save_file_locally(request,user_email,"origin")
    rez = create_user_origins_file(user_email)
    print(rez)
    return rez 

@app.route('/<path:path>')
def serve_static(path):
    return app.send_static_file(path)

if __name__ == "__main__":
    print("buckets")
    # get_face_comparison_result("mititelu.alex@yahoo.com")
    app.run(port=5555, debug=True)