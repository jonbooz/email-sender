require 'aws-sdk-kms'

class Kms

  def initialize
    @kms = Aws::KMS::Client.new
  end

  def decrypt(blob)
    params = {
      ciphertext_blob: blob
    }

    begin
      return (@kms.decrypt params).plaintext
    rescue Aws::KMS::Errors::ServiceError => error
      puts 'Error decrypting data: ' + error.message
    end
  end
  
  def encrypt(key, value)
    params = {
      key_id: key,
      plaintext: value
    }

    begin
      return (@kms.encrypt params).ciphertext_blob
    rescue Aws::KMS::Errors::ServiceError => error
      puts 'Error encrypting data: ' + error.message
    end
  end

end
