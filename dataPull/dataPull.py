import boto3
from requests_oauthlib import OAuth1Session

def handler(event, context):
    oauth = OAuth1Session('test', client_secret='test')

    ddb = boto3.resource('dynamodb')
    table = ddb.Table('email-sender-usersTable-12YXY2T409J6O')
    response = table.get_item(
        Key={
            'name': 'jonbooz'
        }
    )

    item = response['Item']

    message = 'Hello {} {}!'.format(event['first_name'],
                                    event['last_name'])
    return {
        'message': message,
        'userData': item
    }
