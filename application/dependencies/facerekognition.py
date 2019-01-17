import hashlib
import boto3
import botocore
import sys,os
import json

s3 = boto3.resource('s3')
BUCKET_NAME = 'data-vaults-on-web-users'

APPLICATION_DIRECTORY = os.getcwd()

def save_file_locally(request,email,type):

    file_name = get_email_hashed_value(email) + "_" + type + ".jpg"
    path_to_save = os.path.join(APPLICATION_DIRECTORY,"temporary_files",file_name)

    file = request.files.get('webcam')
    file_extension = file.mimetype.split("/")[-1]
    file.save(path_to_save)

def create_response(code,message):
    response = {}
    response["code"] = code
    response["message"] = message
    return json.dumps(response)

def get_email_hashed_value(email):
    return hashlib.md5(email.encode()).hexdigest()


def check_user_existing_file(file_name):
    print(file_name)
    objs = list(s3.Bucket(BUCKET_NAME).objects.filter(Prefix=file_name))
    if len(objs) > 0 and objs[0].key == file_name:
        print("Exists!")
        return True
    else:
        print("Doesn't exist")
        return False
    


def create_user_origins_file(email):
    try:
        hashed_email = get_email_hashed_value(email)

        key_name = hashed_email + "/origin.jpg"

        existing = check_user_existing_file(key_name)
        if existing == True:
            return create_response(401,"Origin file already exists")
        
        file_to_upload_path = os.path.join(APPLICATION_DIRECTORY,"temporary_files",hashed_email+"_origin.jpg")
        file_to_upload = open(file_to_upload_path, "rb")

        s3.Bucket(BUCKET_NAME).put_object(Key=key_name, Body=file_to_upload)
        return create_response(200,"Succesfully created user origin")
    except:
        return create_response(400,"A intervenit o eroare")

def create_user_compare_with_file(email):
    hashed_email = get_email_hashed_value(email)

    key_name = hashed_email + "/reko.jpg"
    
    file_to_upload_path = os.path.join(APPLICATION_DIRECTORY,"temporary_files",hashed_email+"_reko.jpg")
    file_to_upload = open(file_to_upload_path, "rb")

    s3.Bucket(BUCKET_NAME).put_object(Key=key_name, Body=file_to_upload)

    return key_name

def download_s3_origin_file(file_folder):
    file_local_path = os.path.join(APPLICATION_DIRECTORY,"temporary_files",file_folder+"_origin.jpg")
    s3.Bucket(BUCKET_NAME).download_file(file_folder+"/origin.jpg", file_local_path)
    return file_local_path

def get_face_comparison_result(email):
    # reko_key_name = create_user_compare_with_file(email)

    # reko_key_name_parts = reko_key_name.split("/")
    
    # origin_key_name = reko_key_name_parts[0] + "/" + "origin.jpg"
    try:
        hashed_email = get_email_hashed_value(email)

        to_recognize_file=os.path.join(APPLICATION_DIRECTORY,"temporary_files",hashed_email+"_reko.jpg")
        origin_file = download_s3_origin_file(hashed_email)
        
        rekognition_client=boto3.client('rekognition')

        to_recognize_source=open(to_recognize_file,'rb')
        origin_source=open(origin_file,'rb')

        response=rekognition_client.compare_faces(SimilarityThreshold=70,
                                        SourceImage={'Bytes': to_recognize_source.read()},
                                        TargetImage={'Bytes': origin_source.read()})

        similarity_percent = response["FaceMatches"][0]["Similarity"]
        # return response["FaceMatches"][0]["Similarity"]
        
        if similarity_percent>95:
            return create_response(200,"User succesfully recognized")
        else:
            return create_response(400,"Couldn't recognize user")

    except Exception as ex:
        print(ex)
        return create_response(400,"A aparut o eroare")
    

