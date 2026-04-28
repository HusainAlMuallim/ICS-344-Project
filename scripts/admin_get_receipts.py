import json
import boto3
import os
import zipfile

ALLOWED_ADMIN_ARNS = [
    "arn:aws:iam::814562773850:root"
]

def download_dir(client, resource, dist, local='/tmp', bucket=os.environ["RECEIPTS_BUCKET"]):
    paginator = client.get_paginator('list_objects')
    for result in paginator.paginate(Bucket=bucket, Delimiter='/', Prefix=dist):
        if result.get('CommonPrefixes') is not None:
            for subdir in result.get('CommonPrefixes'):
                download_dir(client, resource, subdir.get('Prefix'), local, bucket)
        if result.get('Contents') is not None:
            for file in result.get('Contents'):
                if not os.path.exists(os.path.dirname(local + os.sep + file.get('Key'))):
                    os.makedirs(os.path.dirname(local + os.sep + file.get('Key')))
                resource.meta.client.download_file(bucket, file.get('Key'), local + os.sep + file.get('Key'))
    return

def lambda_handler(event, context):

    # FIX: Block direct invocation — only allow calls through API Gateway
    # with a verified admin identity in the request context
    caller_arn = ""
    if "requestContext" in event:
        caller_arn = event.get("requestContext", {}).get("identity", {}).get("userArn", "")
        if caller_arn not in ALLOWED_ADMIN_ARNS:
            return {"status": "err", "msg": "Access denied. Admin only."}
    else:
        # Direct Lambda invocation without API Gateway context — block it
        return {"status": "err", "msg": "Access denied. Must be called through API Gateway."}

    client = boto3.client('s3')
    resource = boto3.resource('s3')
    m = ""
    d = ""
    y = event["year"]
    if "month" in event:
        m = event["month"] + "/"
    if "day" in event:
        d = event["day"] + "/"

    prefix = "{}/{}{}".format(y, m, d)
    bucket = os.environ["RECEIPTS_BUCKET"]
    download_dir(client, resource, prefix, '/tmp', bucket)
    zip_file = "{}dvsa-order-receipts.zip".format(prefix.replace("/", "-"))
    zf = zipfile.ZipFile("/tmp/" + zip_file, "w")
    for dirname, subdirs, files in os.walk("/tmp"):
        zf.write(dirname)
        for filename in files:
            if filename.endswith(".txt"):
                zf.write(os.path.join(dirname, filename))
    zf.close()
    client.upload_file("/tmp/" + zip_file, bucket, "zip/" + zip_file)
    signed_link = client.generate_presigned_url('get_object',
        Params={'Bucket': bucket, 'Key': "zip/" + zip_file}, ExpiresIn=3600)
    res = {"status": "ok", "download_url": signed_link}
    return res