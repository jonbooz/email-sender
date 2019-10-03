require 'aws-sdk-s3'

class S3
  
  def initialize
    @s3 = Aws::S3::Resource.new
  end

  def get_object(bucket, key)
    object = @s3.bucket(bucket).object(key)
    object.get.body
  end
end
