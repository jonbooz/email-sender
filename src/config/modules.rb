require 'aws-sdk-dynamodb'
require 'aws-sdk-ses'

require './src/services/aws/cloud_formation'
require './src/services/aws/dynamo_db'
require './src/services/aws/ses'
require './src/services/aws/utils'

class Modules

  @@modules = { }

  def self.config
    AwsUtils.configure
  end

  def self.cloud_formation
    get_or_load('cf') { CloudFormation.new(Aws::CloudFormation::Client.new) }
  end

  def self.resources
    cloud_formation.list_resources 'email-sender-ruby'
  end

  def self.get_dynamodb
    get_or_load('ddb') { DynamoDb.new(Aws::DynamoDB::Client.new) }
  end

  def self.get_ses
    get_or_load('ses') { Ses.new(Aws::SES::Client.new) }
  end



  private
  def self.get_or_load(key)
    unless @@modules.has_key? key
      @@modules[key] = yield
    end

    @@modules[key]
  end

end
