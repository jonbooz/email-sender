require 'aws-sdk-ses'

class Ses

  def initialize
    @ses = Aws::SES::Client.new
  end

  def send_email(subject, message_body, source, recipients)
    params = {
      destination: {
        to_addresses: recipients
      },
      message: {
        body: {
          html: {
            charset: 'UTF-8',
            data: message_body
          },
        },
        subject: {
          charset: 'UTF-8',
          data: subject
        }
      },
      source: source
    }
    begin
      @ses.send_email params
    rescue Aws::SES::Errors::ServiceError => error
      puts 'Unable to send email: ' + error.message
    end
  end
end
