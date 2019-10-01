#!/usr/bin/ruby

require_relative './src/services/aws/utils'
AwsUtils.configure

require_relative './src/services/aws/dynamo_db'
require_relative './src/services/aws/cloud_formation'
require_relative './src/services/aws/kms'
require_relative './src/utils/credentials'

ddb = DynamoDb.new
cf = CloudFormation.new
kms = Kms.new
credentials = Credentials.new(ddb, cf, kms)

puts credentials.read 'cred'

=begin
require_relative './src/services/aws/kms'
require_relative './src/services/aws/cloud_formation'
cf = CloudFormation.new
creds_resources = cf.list_resources 'credentials'
puts creds_resources
kms = Kms.new
encrypted = kms.encrypt creds_resources["credentialsKey"], 'test'
puts kms.decrypt encrypted
=end

=begin
require_relative './src/services/aws/cloud_formation'
cf = CloudFormation.new
puts cf.list_resources 'email-sender-ruby'
=end

=begin
require_relative './src/services/aws/ses'
ses = Ses.new
ses.send_email('Test', '<html><head>Test</head><body>This is a test</body></html>', 'jon@jonbooz.com', ['jon@jonbooz.com'])
=end

=begin
require_relative './src/services/aws/s3'
s3 = S3.new
puts s3.get_object('jonbooz-image-sender', 'RedDot.png').string
=end


=begin
require_relative './src/services/aws/dynamo_db'

table = 'email-sender-ruby-modulesTable-1814KJ5KJXQ3A'
key = {
  id: 'jonbooz/test'
}
item = {
  id: 'jonbooz/test',
  entries: ["jonbooz-image-sender:IMG_0087.jpg"],
  heading: 'Image',
  format: 'imageBlob'
}
second = {
  id: 'jonbooz/second',
  entries: ['jonbooz-image-sender:second.jpg'],
  heading: 'Second',
  format: 'imageBlob'
}

ddb = DynamoDb.new
ddb.save(table, second)

result = ddb.read(table, key)

puts result

items = ddb.scan(table,
                 'begins_with(#n, :v1)',
                 {':v1': 'jonbooz'},
                 {'#n': 'id'})

puts items
=end
