require 'aws-sdk-dynamodb'
require 'aws-sdk-ses'

require 'src/services/aws/cloud_formation'
require 'src/services/aws/dynamo_db'
require 'src/services/aws/ses'
require 'src/services/aws/utils'

class Modules
  def initialize
    AwsUtils.configure
  end

  def get_dynamodb
    DynamoDb.new(Aws::DynamoDB::Client.new)
  end

  def get_ses
    Ses.new(Aws::SES::Client.new)
  end

end
